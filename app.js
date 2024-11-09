const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("sendLocation", (data) => {
    io.emit("receiveLocation", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
