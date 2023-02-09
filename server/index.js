const server = require("./app");

const eventRouter = require("./routes/eventRoute");
server.use("/events", eventRouter);

const port = 3000;
server.listen(port, () =>
    console.log(`API is available at http://localhost:${port}`)
);
