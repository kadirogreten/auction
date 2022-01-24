const User = require('../model/user');
const { SECRET } = require('../config/index');
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : SECRET
};


module.exports = passport => {
    passport.use(
        new Strategy(options, async (payload, done) => {
            await User.findById(payload.userId).then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            }).catch((error) => {
                return done(null, false);
            });
        }));
};

