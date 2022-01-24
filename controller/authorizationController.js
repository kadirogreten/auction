var jwt = require('jsonwebtoken');
const { SECRET } = require("../config/index");

/**
 * @description validate token 
 */
validateToken = async (req, res, next) => {
    var token = req.headers.token.replace("Bearer ", "");
    try {
        var decoded = jwt.verify(token, SECRET);
        decoded.token = req.headers.token;
        req.body.user = decoded; // req.body e ekliyoruz sonraki adımlarda erişmek için
        next();
    } catch (err) {
        // err
        return res.status(400).json({
            success: false,
            errorMessage: err
        });
    }
}


module.exports = {
    validateToken
};