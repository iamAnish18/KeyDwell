const express = require('express');
let app = express();
const port = 8080;
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const HomeKey = require('./models/schema');
const methodOverride = require("method-override");
const wrapAsync = require("./unit/wrap")
const ExpressError = require("./unit/expressError");
const {newhomeSchema} = require("./joi.js");

main()
    .then(() => {
        console.log('Database is connected')
    })
    .catch(err => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/homeKey');
}
//Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));

//Server

//index route
app.get("/homeKey",wrapAsync( async (req, res) => {//pass
    let insertdata = await HomeKey.find({});
    res.render('index/list.ejs', { insertdata });
}));

//Create route
app.get("/homeKey/add", (req, res) => {//pass
    res.render('index/add.ejs');
});
app.post("/homeKey", wrapAsync(async (req, res) => {
    let result = newhomeSchema.validate(req.body);
    console.log(result);
    if(result.error){
        throw new Error(400 , "validations error");
    }
    const newHome = new HomeKey(req.body.newhome);
    await newHome.save();
    res.redirect('/homeKey');
}));
//edit route
app.get("/homeKey/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let editHome = await HomeKey.findById(id);
    res.render('index/edit.ejs', { editHome });
}));

// PUT to update the data
app.put("/homeKey/:id", wrapAsync(async (req, res) => {
    if(!req.body.editHome){
        throw new ExpressError(400 , "Enter Valid data")
    }
    let { id } = req.params;
    await HomeKey.findByIdAndUpdate(id, { ...req.body.editHome });
    res.redirect(`/homeKey/${id}`);
}));


//delete route
app.delete("/homeKey/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteHome = await HomeKey.findByIdAndDelete(id);
    console.log(deleteHome);
    res.redirect('/homeKey');
}));
//show route
app.get("/homeKey/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let showData = await HomeKey.findById(id);
    res.render('index/show.ejs', { showData });
}));

// app.all("*" , (req,res)=>{
//     throw new ExpressError(404,"Page is not found");
//     // next(new ExpressError(404,"Page is not found"))
// });

//error handling
app.use(( err , req, res, next) => {
    let {status=500,message="Something went wrong"} = err;
    res.render("index/error.ejs" , {err});
    // res.status(status).send(message);
})
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
