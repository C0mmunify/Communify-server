const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

const userRouter = require("./routes/userRoute");
server.use("/users", userRouter);

const authRouter = require("./routes/authRoutes");
server.use("/auth", authRouter);

const eventRouter = require("./routes/eventRoute");
server.use("/events", eventRouter);

module.exports = server;
