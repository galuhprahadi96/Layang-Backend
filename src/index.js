const route = require("express").Router();

const auth = require("./routes/auth");
const user = require("./routes/users");
const friend = require("./routes/friend");
const message = require("./routes/message");
const room = require("./routes/room");

route.use("/auth", auth);
route.use("/users", user);
route.use("/friend", friend);
route.use("/message", message);
route.use("/room", room);

module.exports = route;