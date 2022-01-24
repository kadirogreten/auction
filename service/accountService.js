const AccountRepository = require("../repository/accountRepository");
const { getAll } = require("../repository/auctionRepository");

register = async (user) => {
    return await AccountRepository.register(user);
}

getProfileById = async (id) => {
    return await AccountRepository.getProfileById(id);
}

getProfileByUsername = async (username) => {
    return await AccountRepository.getProfileByUsername(username);
}

getProfileByEmail = async (email) => {
    return await AccountRepository.getProfileByEmail(email);
}

getToken = async (username, password, role) => {
    return await AccountRepository.login(username, password, role);
}

getAllUsers = async (model) => {
    return await AccountRepository.getAllWithPagination(model);
}


module.exports = {
    register,
    getProfileById,
    getProfileByUsername,
    getProfileByEmail,
    getToken,
    getAllUsers
}