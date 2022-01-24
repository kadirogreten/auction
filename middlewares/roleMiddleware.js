
const checkRole = roles => (req,res,next)=> {
    if (roles.includes(req.user.role)) {
        return next();
    }

    return res.status(401).json({
        errorMessage: 'Unauthorized! Yetkisiz giriş!',
        success: false
    });
}


module.exports = {
    checkRole
}