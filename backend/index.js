require("dotenv").config();
const express = require("express");
const debug = require("debug")("terraferma");
const morgan = require("morgan");
const cors = require("cors");

require("./config/mongooseConfig");

const server = express();
const port = process.env.PORT || 4001;

server.use(cors());

server.use(morgan("dev"));
server.use(express.json());

const activityRouter = require("./routes/activityRouter");

server.use("/activities", activityRouter);

const clientRouter = require("./routes/clientRouter");

server.use("/clients", clientRouter);

const purchaseRouter = require("./routes/purchaseRouter");

server.use("/purchases", purchaseRouter);

server.listen(port, () => { debug(`Server is running on port ${port}`); });
