const { validationResult } = require("express-validator");
const SocketService = require("../service/socketService");

connectUserToSocket = async (req, res, next) => {
    // check request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errorMessage: "Validation Error!",
            errors: errors.array(),
        });
    }

    const { user, socketid } = req.body;
    let result = await SocketService.connectUserToSocket(user.userId, socketid);
    res.send(result);
}

disconnectUserFromSocket = async (req, res, next) => {
    // check request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errorMessage: "Validation Error!",
            errors: errors.array(),
        });
    }

    const { user, socketid } = req.body;
    let result = await SocketService.disconnectUserFromSocket(user.userId, socketid);
    res.send(result);

}

module.exports = {
    connectUserToSocket,
    disconnectUserFromSocket
}