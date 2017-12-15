const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../server/models/user.model');
const config = require('../config/config')

module.exports = function (passport) {
    // Options
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.sessionSecret;

    // Jwt strategy
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.data._id, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user )
            } else {
                return done(null, false)
            }
        })
    }))
}