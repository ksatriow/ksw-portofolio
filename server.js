const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./router');
const fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');

const passport = require('./library/passport');
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(router);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));