import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";

export interface User {
  name: string;
  socket: Socket;
}

export class UserManager {
  private users: User[];
  private queue: string[];
  private roomManager: RoomManager;

  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomManager();
  }

  addUser(name: string, socket: Socket) {
    // prevent duplicates
    if (this.users.find((u) => u.socket.id === socket.id)) return;

    this.users.push({ name, socket });
    // socket id is unique
    this.queue.push(socket.id);
    socket.emit("lobby");
    this.clearQueue();
    this.initHandlers(socket);
  }

  removeUser(socketId: string) {
    this.users = this.users.filter((x) => x.socket.id !== socketId);
    this.queue = this.queue.filter((x) => x !== socketId);
  }

  private getUser(socketId: string) {
    return this.users.find((u) => u.socket.id === socketId);
  }

  private clearQueue() {
    if (this.queue.length < 2) {
      return;
    }

    const id1 = this.queue.shift();
    const id2 = this.queue.shift();

    const user1 = this.users.find((x) => x.socket.id === id1);
    const user2 = this.users.find((x) => x.socket.id === id2);

    if (!user1 || !user2) return;

    // make a room !
    const room = this.roomManager.createRoom(user1, user2);
    this.clearQueue();
  }

  private requeueExistingUser(socketId: string) {
    const user = this.getUser(socketId);
    if (!user) return;

    // do not re-add to this.users, do not re-init handlers
    if (!this.queue.includes(socketId)) this.queue.push(socketId);
    user.socket.emit("lobby");
  }

  handleQuitOrSkip(socket: Socket, type: "quit" | "skip") {
    console.log("Reset requested by user:", socket.id, "Type:", type);
    const room = this.roomManager.closeRoomBySocketId(socket.id);
    if (!room) {
      // not in a room -> just requeue
      if (type === "quit") {
        this.removeUser(socket.id);
        return;
      }
      this.requeueExistingUser(socket.id);
      this.clearQueue();
      return;
    }
    const user1 = room.user1;
    const user2 = room.user2;
    const recievingUser =
      room.user1.socket.id === socket.id ? room.user2 : room.user1;
    const currentUser =
      room.user1.socket.id === socket.id ? room.user1 : room.user2;

    console.log(
      "Room closed between:",
      user1.socket.id,
      "and",
      user2.socket.id
    );
    // two cases
    if (type === "quit") {
      console.log("Current quit:", currentUser.socket.id);
      console.log("Receiving user:", recievingUser.socket.id);
      this.removeUser(currentUser.socket.id);
      this.requeueExistingUser(recievingUser.socket.id);
    } else {
      // skip logic here
      this.requeueExistingUser(currentUser.socket.id);
      this.requeueExistingUser(recievingUser.socket.id);
    }

    this.clearQueue();
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
