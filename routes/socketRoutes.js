const express = require("express");
const router = express.Router();
const { check } = require('express-validator'); // bunu body ve request leri validate etmek için kullanıyoruz

// Controller
const SocketController = require("../controller/socketController");
const AuthorizationController = require("../controller/authorizationController");

router.post("/connect",
    check("socketid")
        .exists()
        .notEmpty(),
    AuthorizationController.validateToken,
    SocketController.connectUserToSocket
);

router.post("/disconnect",
    check("socketid")
        .exists()
        .notEmpty(),
    AuthorizationController.validateToken,
    SocketController.disconnectUserFromSocket
);

module.exports = router;