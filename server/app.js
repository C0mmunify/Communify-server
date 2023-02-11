const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

const userRouter = require("./routes/userRoute");
server.use("/user", userRouter);

const authRouter = require("./routes/authRoutes");
server.use("/auth", authRouter);

module.exports = server;
