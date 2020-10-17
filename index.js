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