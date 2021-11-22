const { instrument } = require("@socket.io/admin-ui");
const port = process.env.PORT || 3000;

var http = require("http");

var express = require("express");
const { log } = require("console");

var app = express();

var server = http.createServer(app);
// Pass a http.Server instance to the listen method
var io = require("socket.io")(server, {
  cors: {
    origin: [
      "https://alnakeeb-chat.herokuapp.com/",
      "https://admin.socket.io/",
    ],
    credentials: true,
  },
});
// The server should start listening
server.listen(port);
// Register the index route of your app that returns the HTML file
app.use(express.static("./"));

/*-------------------------------------------server side --------------------------------------------------*/

const users = {};

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use("/static", express.static("node_modules"));

io.on("connection", (socket) => {
  //new user joined the chat handling serverside
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
    console.log(users);
  });

  //new user leaved the chat handling serverside
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });

  //handling chat messages
  socket.on("send-chat-message", (message, room) => {
    if (room == "") {
      socket.broadcast.emit("chat-message", {
        message: message,
        name: users[socket.id],
        room: room,
      });
    } else {
      socket.broadcast.to(room).emit("chat-message", {
        message: message,
        name: users[socket.id],
        room: room,
      });
    }
  });
});

instrument(io, { auth: false });
