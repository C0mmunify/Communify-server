const server = require("./app");

const port = 3000;
server.listen(port, () =>
    console.log(`API is available at http://localhost:${port}`)
);
