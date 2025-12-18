import { User } from "./UserManager";

export interface Room {
  user1: User;
  user2: User;
}
let GLOBAL_ROOM_ID = 1;
export class RoomManager {
  private rooms: Map<string, Room>;
  private roomIdBySocketId: Map<string, string>;
  constructor() {
    this.rooms = new Map<string, Room>();
    this.roomIdBySocketId = new Map<string, string>();
  }

  createRoom(user1: User, user2: User) {
    const roomId = this.generate().toString();
    this.rooms.set(roomId.toString(), {
      user1,
      user2,
    });

    // track membership
    this.roomIdBySocketId.set(user1.socket.id, roomId);
    this.roomIdBySocketId.set(user2.socket.id, roomId);

    console.log(
      `Room ${roomId} created between ${user1.name} and ${user2.name}`
    );

    user1.socket.emit("send-offer", { roomId, role: "offerer" });
    user2.socket.emit("wait-offer", { roomId, role: "answerer" });
  }

  onOffer(roomId: string, sdp: string, senderSocketId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const recievingUser =
      room.user1.socket.id === senderSocketId ? room.user2 : room.user1;
    console.log("Sending offer to user:", recievingUser.socket.id);
    recievingUser?.socket.emit("offer", { sdp, roomId });
  }

  onAnswer(roomId: string, sdp: string, senderSocketid: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    const receivingUser =
      room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
    console.log("Sending answer to user:", receivingUser.socket.id);
    receivingUser?.socket.emit("answer", {
      sdp,
      roomId,
    });
  }

  onIceCandidates(
    roomId: string,
    senderSocketid: string,
    candidate: any,
    type: "sender" | "receiver"
  ) {
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    const receivingUser =
      room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
    // console.log("Sending ICE candidate to user:", receivingUser.socket.id);
    receivingUser.socket.emit("add-ice-candidate", { candidate, type });
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }

  get(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  getRoomIdBySocketId(socketId: string): string | undefined {
    return this.roomIdBySocketId.get(socketId);
  }

  closeRoomByRoomId(roomId: string): Room | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    this.rooms.delete(roomId);
    this.roomIdBySocketId.delete(room.user1.socket.id);
    this.roomIdBySocketId.delete(room.user2.socket.id);

    return room;
  }

  closeRoomBySocketId(socketId: string): Room | null {
    const roomId = this.roomIdBySocketId.get(socketId);
    if (!roomId) return null;
    return this.closeRoomByRoomId(roomId);
  }
}
