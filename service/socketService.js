const SocketRepository = require("../repository/socketRepository");


connectUserToSocket = async (id, socketid) => {
    return await SocketRepository.connectUserToSocket(id, socketid);
}


disconnectUserFromSocket = async (id, socketid) => {
    return await SocketRepository.disconnectUserFromSocket(id, socketid);
}


module.exports = {
    connectUserToSocket,
    disconnectUserFromSocket
}