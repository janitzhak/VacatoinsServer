const express = require("express");
const router = express.Router();
const followLogic = require('../logic/follow-logic');
const jwt_decode = require('jwt-decode');

router.get("/", async (request, response, next)  => {
    try {
        let token = request.headers.authorization
        // let decodedHeader = jwt_decode(token)

        let followUpTable = await followLogic.getAllFollowUp();
        response.json(followUpTable);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});


router.post("/", async (request, response, next) => {
    let likeData = request.body;
    // likeData.userId = request.headers.Authorization.userId
    let token = request.headers.authorization
    let decodedHeader = jwt_decode(token)

    likeData.userId = decodedHeader.userId
    try {
        let likesArrey = await followLogic.addLike(likeData);
        response.json(likesArrey)
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});


module.exports = router;