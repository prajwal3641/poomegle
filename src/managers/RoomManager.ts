import { User } from "./UserManager";

export interface Room {
  user1: User;
  user2: User;
}
let ROOM_COUNT_GLOBAL = 0;
export class RoomManager {
  private rooms: Map<string, Room>;
  constructor() {
    this.rooms = new Map<string, Room>();
  }

  createRoom(user1: User, user2: User) {
    const roomID = ++ROOM_COUNT_GLOBAL;
    this.rooms.set(roomID.toString(), { user1, user2 });

    user1.socket.emit("send-offer", {
      roomID,
    });
    user2.socket.emit("send-offer", {
      roomID,
    });
  }

  onOffer(roomId: string, sdp: string, senderSocketId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const recievingUser =
      room.user1.socket.id === senderSocketId ? room.user2 : room.user1;
    recievingUser?.socket.emit("offer", { sdp, roomId });
  }

  onAnswer(roomId: string, sdp: string, senderSocketid: string) {
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    const receivingUser =
      room.user1.socket.id === senderSocketid ? room.user2 : room.user1;

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
    receivingUser.socket.emit("add-ice-candidate", { candidate, type });
  }
}
