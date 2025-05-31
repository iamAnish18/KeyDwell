const express = require('express');
const route = express.Router();
const User = require('../models/userSchema');
const wrapAsync = require('../utily/wrapAsync');
const passport = require('passport');
const local = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


route.get("/signIn", (req, res) => {
    res.render("users/signup.ejs")
});
route.post("/signIn", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.flash("success", "welcome to keydwell");
        res.redirect("/Keydwell/home")
    } catch (err) {
        req.flash("error", err.message);
        res.redirect('/Keydwell/home')
    }
}));
route.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

route.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async (req, res) => {
    req.flash("success" , "successful Log In");
    res.redirect('/Keydwell/home')
});

route.get("/logout" , (req,res , next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success" , "log out successfully");
        res.redirect("/Keydwell/home");
    });
});

module.exports = route;
