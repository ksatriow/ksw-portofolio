const { User } = require('../models');
const jwt = require('../library/jwt');
const passport = require('../library/passport');

module.exports = {
    register: (req, res) => {
        res.render('./user/register', { title: "Register" })
    },
    // login: (req, res) => {
    //     let message = req.flash('error');
    //     res.render('./user/login', { title: "Login", message: req.flash('error') });
    //     res.render('./user/login', { isAuth: req.isAuthenticated(), message: req.flash('error') });
    // },
    login: (req, res) => {
        res.render('./user/login', { title: "Login", message: "" });
    },
    doRegister: async (req, res) => {
        try {
            const { username, password } = req.body;
            encryptedPassword = jwt.encrypt(password, 10);
            const user = await User.create({ username, password: encryptedPassword });
            // res.status(200).json({
            //     status: 200,
            //     message: "User berhasil didaftarkan",
            //     data: user
            // })
            res.redirect('/user/login');
        }
        catch(err) {
            // res.status(400).json({
            //     status: 400,
            //     message: err.message
            // });
            res.redirect('/user/register');
        }
    },
    doLogin: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user) {
                // res.json({ status: 404, message: "User not found" });
                return res.render('./user/login', { message: "User not found" })
            } 
    
            const isPasswordValid = jwt.checkPassword(password, user.password);
            if (!isPasswordValid) {
                // res.json({ status: 404, message: "Invalid password" });
                return res.render('./user/login', { message: "Invalid password" })
            }
            const token = jwt.generateToken(user.id, user.username);

            const options = {
                maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                httpOnly: true, // The cookie only accessible by the web server
            }
            
            res.cookie('token', token, options)
            res.redirect('/cms')
            // res.json({
            //     id: user.id,
            //     username: user.username,
            //     token: token
            // });
        }
        catch(err) {
            res.status(400).json({
                message: err.message
            });
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/user/login');
    }
}