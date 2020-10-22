require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routerNavigation = require("./src");
const socket = require("socket.io");

const app = express();
app.use(express.static("uploads"));
app.use(cors());

const http = require("http");
const server = http.createServer(app);
const io = socket(server)

io.on("connection", (socket) => {
  console.log("Socket.io Connect !")

  socket.on("joinRoom", (data) => {
    socket.join(data);
    socket.to(data).emit("chatMessage");
  });

  socket.on("roomMessage", (data) => {
    console.log(data)
    socket.join(data.code_chatroom);
    io.to(data.code_chatroom).emit("chatMessage", data);
  });

  socket.on("createRoom", (data) => {
    console.log(data)
    // socket.join(data.code_chatroom);
    socket.broadcast.emit("room", data)
  })

  socket.on("typing", (data) => {
    console.log(data)
    socket.join(data.code_chatroom);
    socket.broadcast.emit("typingMessage", data)
  })
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/", routerNavigation);

app.get("*", (request, response) => {
  response.status(404).send("Path Not Found !");
});

server.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
});