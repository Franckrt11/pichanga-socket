const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
// const log4js = require("log4js");

// log4js.configure({
//   appenders: { everything: { type: "file", filename: "node.log" } },
//   categories: { default: { appenders: ["everything"], level: "ALL" } },
// });

// const logger = log4js.getLogger();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Access forbidden. Please go to www.tejuegounapichanga.com");
});

io.on("connection", (socket) => {
  // logger.debug("User connected: " + socket.id);
  console.log("User connected: " + socket.id);

  socket.on("subscribe", (room) => {
    // logger.debug("User " + socket.id + " join room: " + room);
    socket.join(room);
  });

  socket.on("unsubscribe", (room) => {
    // logger.debug("User " + socket.id + " leave room: " + room);
    socket.leave(room);
  });

  socket.on("message", (data) => {
    // logger.debug("New Message: " + JSON.stringify(data));
    socket.in(data.chat_id).emit("message", data);
  });

  socket.on("disconnect", () => {
    // logger.debug("User disconnected: " + socket.id);
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(3000, () => {
  // logger.debug("Server running at port: 3000");
  console.log("Server running at port: 3000");
});
