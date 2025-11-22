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
        res.render('./user/login-v2', { title: "Login", message: "" });
    },
    doRegister: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Server-side validation
            if (!username || username.length < 3) {
                return res.render('./user/register', { message: "Username must be at least 3 characters" });
            }
            if (!password || password.length < 8) {
                return res.render('./user/register', { message: "Password must be at least 8 characters" });
            }

            encryptedPassword = jwt.encrypt(password, 10);
            const user = await User.create({ username, password: encryptedPassword });
            res.redirect('/user/login');
        }
        catch (err) {
            const message = err.name === 'SequelizeUniqueConstraintError'
                ? 'Username already exists'
                : 'Registration failed';
            res.render('./user/register', { message });
        }
    },
    doLogin: async (req, res) => {
        try {
            const { username, password, 'remember-me': rememberMe } = req.body;

            // Server-side validation
            if (!username || username.length < 3) {
                return res.render('./user/login-v2', { message: "Username must be at least 3 characters" });
            }
            if (!password || password.length < 8) {
                return res.render('./user/login-v2', { message: "Password must be at least 8 characters" });
            }

            const user = await User.findOne({ where: { username } });
            if (!user) {
                // Generic message for security (don't reveal if user exists)
                return res.render('./user/login-v2', { message: "Invalid username or password" })
            }

            const isPasswordValid = jwt.checkPassword(password, user.password);
            if (!isPasswordValid) {
                return res.render('./user/login-v2', { message: "Invalid username or password" })
            }
            const token = jwt.generateToken(user.id, user.username);

            // Implement remember-me functionality
            const maxAge = rememberMe
                ? 1000 * 60 * 60 * 24 * 7  // 7 days if remember-me is checked
                : 1000 * 60 * 60;           // 1 hour otherwise

            const options = {
                maxAge: maxAge,
                httpOnly: true, // The cookie only accessible by the web server
                secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
            }

            res.cookie('token', token, options)
            res.redirect('/cms')
        }
        catch (err) {
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