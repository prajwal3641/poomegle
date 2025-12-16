import { User } from "./UserManager";

export interface Room {
  user1: User;
  user2: User;
}
let GLOBAL_ROOM_ID = 1;
export class RoomManager {
  private rooms: Map<string, Room>;
  constructor() {
    this.rooms = new Map<string, Room>();
  }

  createRoom(user1: User, user2: User) {
    const roomId = this.generate().toString();
    this.rooms.set(roomId.toString(), {
      user1,
      user2,
    });

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
    console.log("Sending ICE candidate to user:", receivingUser.socket.id);
    receivingUser.socket.emit("add-ice-candidate", { candidate, type });
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }
}
