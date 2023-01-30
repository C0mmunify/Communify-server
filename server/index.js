const express = require("Express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

const userRouter = require("./routes/userRoute");
server.use("/user", userRouter);

const authRouter = require("./routes/authRoutes");
server.use("/auth", authRouter);

const port = 3000;
server.listen(port, () =>
    console.log(`API is available at http://localhost:${port}`)
);
