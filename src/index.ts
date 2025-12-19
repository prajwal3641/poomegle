import { Socket, Server } from "socket.io";
import http from "http";

import express from "express";
import { UserManager } from "./managers/UserManager";
import { RoomManager } from "./managers/RoomManager";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const userManager = new UserManager();

io.on("connection", (socket: Socket) => {
  console.log("a user connected:", socket.id);
  const count = io.of("/").sockets.size; // standard single-node count [web:320]
  socket.emit("live-users", { count });
  socket.broadcast.emit("live-users", { count });
  userManager.addUser(`User-${socket.id}`, socket);
  socket.on("disconnect", (reason) => {
    console.log("user disconnected:", socket.id, "and reason is:", reason);
    userManager.handleQuitOrSkip(socket, "quit");
    const count = io.of("/").sockets.size;
    socket.broadcast.emit("live-users", { count });
    // userManager.removeUser(socket.id);
  });
});
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
