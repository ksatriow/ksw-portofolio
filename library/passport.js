
const passport = require('passport');
const { User } = require('../models');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

var cookieExtractor = (req) => {
    let token;
    if (req.cookies)
        token = req.cookies.token;
    return token;
}
/* Passport JWT Options */
const options = {
    // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
    //  jwtFromRequest : ExtractJwt.fromHeader ('authorization' ),
    jwtFromRequest: cookieExtractor,
    /* Harus sama seperti dengan apa yang kita masukkan sebagai parameter kedua dari jwt.sign di User Model.
     Inilah yang kita pakai untuk memverifikasi apakah tokennya dibuat oleh sistem kita */
    secretOrKey: process.env.SECRET_KEY,
}

passport.use(new JwtStrategy(options, async (payload, done) => {
    // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
    User.findByPk(payload.id)
        .then(user => done(null, user))
        .catch(err => done(err, false))
}))

// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport;
