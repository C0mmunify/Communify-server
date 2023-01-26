
const express = require('Express');
const server = express();
const port = 3000;
const userRoute = require('routes/userRoute');

server.use('/user', userRoute)

server.listen(port, () => console.log(`API is available at http://localhost:${port}`)) 