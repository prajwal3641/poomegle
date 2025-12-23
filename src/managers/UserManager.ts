import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";

export interface User {
  name: string;
  socket: Socket;
}

export class UserManager {
  // O(1) user lookup by socketId
  private users: Map<string, User> = new Map();

  // O(1) pool with swap-with-last deletion
  private pool: Map<number, string> = new Map(); // key → socketId
  private keyOf: Map<string, number> = new Map(); // socketId → key
  private nextKey = 0;

  // O(1) last partner check (prevents immediate rematch)
  private lastPartner: Map<string, string> = new Map();

  private roomManager: RoomManager;

  constructor() {
    this.roomManager = new RoomManager();
  }

  // --- Pool Operations (all O(1)) ---

  private addToPool(socketId: string): void {
    if (this.keyOf.has(socketId)) return; // already in pool
    const key = this.nextKey++;
    this.pool.set(key, socketId);
    this.keyOf.set(socketId, key);
  }

  private removeFromPool(socketId: string): void {
    const key = this.keyOf.get(socketId);
    if (key === undefined) return;

    const lastKey = this.nextKey - 1;

    // Swap with last if not already last
    if (key !== lastKey) {
      const lastSocketId = this.pool.get(lastKey)!;
      this.pool.set(key, lastSocketId);
      this.keyOf.set(lastSocketId, key);
    }

    // Delete last position
    this.pool.delete(lastKey);
    this.keyOf.delete(socketId);
    this.nextKey--;
  }


  private poolSize(): number {
    return this.nextKey;
  }

  // Pick two random users from pool - O(1)
  private pickTwoRandom(): [string, string] | null {
    if (this.nextKey < 2) return null;

    const key1 = Math.floor(Math.random() * this.nextKey);
    let key2 = Math.floor(Math.random() * (this.nextKey - 1));
    if (key2 >= key1) key2++; // avoid same key

    return [this.pool.get(key1)!, this.pool.get(key2)!];
  }

  // --- User Management ---

  addUser(name: string, socket: Socket) {
    // prevent duplicates
    if (this.users.has(socket.id)) return;

    this.users.set(socket.id, { name, socket });
    this.addToPool(socket.id);
    socket.emit("lobby");
    this.tryMatch();
    this.initHandlers(socket);
  }

  removeUser(socketId: string) {
    this.users.delete(socketId);
    this.removeFromPool(socketId);

    // Clean stale lastPartner: if my partner still has me as lastPartner, remove it
    const partnerId = this.lastPartner.get(socketId);
    if (partnerId && this.lastPartner.get(partnerId) === socketId) {
      this.lastPartner.delete(partnerId);
    }
    this.lastPartner.delete(socketId);
  }

  private getUser(socketId: string): User | undefined {
    return this.users.get(socketId);
  }

  // --- Matching Logic ---

  private tryMatch(): void {
    if (this.poolSize() < 2) return;

    // Try random picks (with retry for lastPartner collision)
    const maxAttempts = Math.min(5, this.poolSize());

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const pair = this.pickTwoRandom();
      if (!pair) return;

      const [aId, bId] = pair;

      // Check if EITHER has the other as lastPartner (two-way check)
      if (this.lastPartner.get(aId) === bId || this.lastPartner.get(bId) === aId) continue;

      const userA = this.getUser(aId);
      const userB = this.getUser(bId);

      if (!userA || !userB) continue;

      // Valid match found!
      this.removeFromPool(aId);
      this.removeFromPool(bId);

      // Record as last partners
      this.lastPartner.set(aId, bId);
      this.lastPartner.set(bId, aId);

      // Create room
      this.roomManager.createRoom(userA, userB);

      // Try to match more pairs
      this.tryMatch();
      return;
    }

    // Fallback: if retries exhausted, force match first valid pair
    // This handles triangle block (A→B→C→A) and 2-user scenarios
    if (this.poolSize() >= 2) {
      const pair = this.pickTwoRandom();
      if (pair) {
        const [aId, bId] = pair;
        const userA = this.getUser(aId);
        const userB = this.getUser(bId);

        if (userA && userB) {
          this.removeFromPool(aId);
          this.removeFromPool(bId);
          this.lastPartner.set(aId, bId);
          this.lastPartner.set(bId, aId);
          this.roomManager.createRoom(userA, userB);

          // Try to match remaining users
          this.tryMatch();
        }
      }
    }
  }

  private requeueExistingUser(socketId: string) {
    const user = this.getUser(socketId);
    if (!user) return;

    if (!user.socket.connected) {
      this.removeUser(socketId);
      return;
    }

    // Add back to pool if not already there
    this.addToPool(socketId);
    user.socket.emit("lobby");
  }

  handleQuitOrSkip(socket: Socket, type: "quit" | "skip") {
    console.log("Reset requested by user:", socket.id, "Type:", type);
    const room = this.roomManager.closeRoomBySocketId(socket.id);

    if (!room) {
      // not in a room -> just requeue or remove
      if (type === "quit") {
        this.removeUser(socket.id);
        return;
      }
      this.requeueExistingUser(socket.id);
      this.tryMatch();
      return;
    }

    const recievingUser =
      room.user1.socket.id === socket.id ? room.user2 : room.user1;
    const currentUser =
      room.user1.socket.id === socket.id ? room.user1 : room.user2;

    console.log(
      "Room closed between:",
      room.user1.socket.id,
      "and",
      room.user2.socket.id
    );

    if (type === "quit") {
      console.log("Current quit:", currentUser.socket.id);
      console.log("Receiving user:", recievingUser.socket.id);
      this.removeUser(currentUser.socket.id);
      this.requeueExistingUser(recievingUser.socket.id);
    } else {
      // Skip: record as last partners (prevents immediate rematch)
      this.lastPartner.set(currentUser.socket.id, recievingUser.socket.id);
      this.lastPartner.set(recievingUser.socket.id, currentUser.socket.id);

      this.requeueExistingUser(currentUser.socket.id);
      this.requeueExistingUser(recievingUser.socket.id);
    }

    this.tryMatch();
  }

  initHandlers(socket: Socket) {
    socket.on("offer", ({ sdp, roomId }: { sdp: string; roomId: string }) => {
      // console.log("Offer received for user:", socket.id);
      this.roomManager.onOffer(roomId, sdp, socket.id);
    });

    socket.on("answer", ({ sdp, roomId }: { sdp: string; roomId: string }) => {
      // console.log("Answer received for user:", socket.id);
      this.roomManager.onAnswer(roomId, sdp, socket.id);
    });

    socket.on("add-ice-candidate", ({ candidate, roomId, type }) => {
      // console.log("Ice candidate received for user:", socket.id);
      this.roomManager.onIceCandidates(roomId, socket.id, candidate, type);
    });

    socket.on("reset", ({ type }: { type: "quit" | "skip" }) => {
      this.handleQuitOrSkip(socket, type);
    });
  }
}
