const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    encrypt: (password) => {
        return bcrypt.hashSync(password, 10)
    },
    checkPassword: (password, encryptedPassword) => {
        return bcrypt.compareSync(password, encryptedPassword)
    },
    generateToken: (id, username) => {
        const payload = {
            id,
            username
        };

        const secretOrKey = SECRET_KEY;
        const token = jwt.sign(payload, secretOrKey, {expiresIn: '1h'});
        return token;
    } 
}