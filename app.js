const express = require('express');
const cors = require('cors');

const server = express();

const vacationsController = require('./controllers/vacations-controller');
const usersController = require('./controllers/users-controller');
const followController = require('./controllers/follow-controler');
const loginFilter = require('./middleware/login-filter');




server.use(cors({origin: "http://localhost:3000"}));
server.use(loginFilter());

server.use(express.json());


server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/follow", followController);



// server.use(errorHandler);

// The following line launches the node server, on port 3001
server.listen(3001, () => console.log("Listening on http://localhost:3001"));