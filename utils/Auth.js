const User = require("../model/user");
const bcrypt = require("bcryptjs");
const passport = require('passport');

/**
 * @description Register User validations
 *
 */
const validateUsername = async (name) => {

// Query for a movie that has the title 'The Room'
    const query = { username: name };
    let user = await User.findOne(query);
    !user ? true : false;
};

const validateEmail = async (email) => {
    let user = await User.findOne({
        email: email
    });


    return !user ? true : false;
};

const hashedPassword = async (password) => {
    const hashed = await bcrypt.hash(password, 15);

    return hashed;
};

const encryptPassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword);

    return isMatch;
};

const validateToken = passport.authenticate("jwt", { session: false });


module.exports = {
    hashedPassword,
    validateEmail,
    validateUsername,
    encryptPassword,
    validateToken
};