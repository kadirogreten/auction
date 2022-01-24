
const bcrypt = require("bcryptjs");

const hashedPassword = async (password) => {
    const hashed = await bcrypt.hash(password, 15);

    return hashed;
};

const encryptPassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword);

    return isMatch;
};

module.exports = {
    hashedPassword,
    encryptPassword
};