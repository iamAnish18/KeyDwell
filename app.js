const express = require('express');
let app = express();
const port = 3000;
const path = require('path');
const ejsMate = require('ejs-mate');
const Override = require('method-override');
const expressError = require('./utily/expressError.js');
const keydwell = require('./routes/keydwell.js');
const reviews = require('./routes/reviews.js');
const Session = require('express-session');
const flash = require('connect-flash');


// database
const mongoose = require('mongoose');
const KeyDwellSchema = require('./models/schema');
const Reviews = require('./models/review.js');

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
    secret : "mysupersectecode",
    resave : false,
    saveUnitialized : true,
    cookies : {
        expires : Date.now() +7 *24*60*60*1000 ,
        maxAge : 7*24*60*60*1000,
        httpOnly : true //it will protect crock scpriting attackes
    }
}
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(Override('_method'));
// 
app.use(Session(sessionOutput));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


// Server route
app.use('/Keydwell' , keydwell);
// reviews route 

app.use('/Keydwell' , reviews);

// page not found
app.all("*", (req, res, next) => {
    next(new expressError(404, "Page Not found"))
})
app.use((err, req, res, next) => {
    let { status = 500, message = "Enter Wrong input" } = err;
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});
