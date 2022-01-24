const registerResponseSerializers = user => {
    return {
        username: user.username,
        email: user.email,
        id: user._id,
        createdAt: user.createdAt,
        name: user.name,
        surname: user.surname
    };
}


const profileResponseSerializers = user => {
    return {
        username: user.username,
        email: user.email,
        id: user._id,
        createdAt: user.createdAt,
        name: user.name,
        surname: user.surname

    };
}

const tokenResponseSerializers = (user, token) => {
    var date = new Date(); // Now
    return {
        username: user.username,
        role: user.role,
        id: user._id,
        token: `Bearer ${token}`,
        expiresIn: date.setDate(date.getDate() + 365),
    };
}

module.exports = {
    registerResponseSerializers,
    profileResponseSerializers,
    tokenResponseSerializers
}