require("dotenv").config();
const express = require("express");
const debug = require("debug")("terraferma");
const morgan = require("morgan");

require("./config/mongooseConfig");

const server = express();
const port = process.env.PORT || 4001;

server.use(morgan("dev"));
server.use(express.json());



server.listen(port, () => { debug(`Server is running on port ${port}`); });