require("dotenv").config();

let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let usersRouter = require("./routes/users");
let productsRouter = require("./routes/products");
let homePage = require("./routes/index");
let subjectsRouter = require("./routes/subjetcs");

const PUBLIC = path.join(__dirname, "/public");
const { PORT, VERSION } = process.env;

let server = express();

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(PUBLIC));

server.use("/", homePage);
server.use(VERSION + "/users", usersRouter);
server.use(VERSION + "/products", productsRouter);
server.use(VERSION + "/subjects", subjectsRouter);

server.listen(PORT, () => {
  console.log(`This server is running on http://localhost:${PORT}`);
});

module.exports = server;
