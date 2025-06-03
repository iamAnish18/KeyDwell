const User = require('../models/userSchema');
module.exports.SignIn = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", "welcome to keydwell");
            res.redirect("/Keydwell/home")
        });
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect('/Keydwell/home')
    }
}

module.exports.login = async (req, res) => {
        req.flash("success", "successful Log In");
        let redirectUrl = req.session.redirectUrl || "Keydwell/home"
        res.redirect(redirectUrl);
}

module.exports.logout = async(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "log out successfully");
        res.redirect("/Keydwell/home");
    });
}
