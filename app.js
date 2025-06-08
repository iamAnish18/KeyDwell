if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express');
let app = express();
const port = 3000;
const path = require('path');
const ejsMate = require('ejs-mate');
const Override = require('method-override');
const expressError = require('./utily/expressError.js');
const keydwellRoute = require('./routes/keydwell.js');
const reviewsRoute = require('./routes/reviews.js');
const userRoute = require('./routes/user.js');
const Session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/userSchema.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// database
const mongoose = require('mongoose');
// const KeyDwellSchema = require('./models/schema');
// const Reviews = require('./models/review.js');

main()
    .then(() => {
        console.log(`database is connected`)
    }).catch((err) => {
        console.log(err)
    });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/KeyDwell');
}
const sessionOutput = {
    secret : "keydwellSecret",
    resave : true,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
};

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(Override('_method'));
app.use(Session(sessionOutput));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user || null;
    next();
});
app.get("/demouser" ,async (req,res) =>{
    let inputdata = new User({
        email : "iamanish18@gmail.com",
        username : "iamakash"
    });
    let randompass = await User.register(inputdata , "hello bhai");
    res.send(randompass);
})
// Server route
app.use('/Keydwell' , keydwellRoute);
// reviews route 
app.use('/Keydwell' , reviewsRoute);
// signup
app.use("/" , userRoute);

// page not found
app.all("*", (req, res, next) => {
    next(new expressError(404, "Page Not found"));
})
app.use((err, req, res, next) => {
    let { status = 500, message = "Enter Wrong input" } = err;
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});
