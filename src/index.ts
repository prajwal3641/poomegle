import { Socket, Server } from "socket.io";
import http from "http";

import express from "express";
import { UserManager } from "./managers/UserManager";

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
  userManager.addUser(`User-${socket.id}`, socket);
  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    userManager.removeUser(socket.id);
  });
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
