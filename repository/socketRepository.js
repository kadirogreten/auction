const User = require("../model/user");


connectUserToSocket = async (id, socketid) => {
    try {
        let result = await User.findByIdAndUpdate(id, {
            socketId: socketid,
            isOnline: true,
            updatedAt: Date.now()
        });
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: error,
        };
    }

}

disconnectUserFromSocket = async (id, socketid) => {
    try {
        let result = await User.findByIdAndUpdate(id, {
            socketId: socketid,
            isActive: false,
            updatedAt: Date.now()
        });
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: error,
        };
    }
}

module.exports = {
    connectUserToSocket,
    disconnectUserFromSocket
}