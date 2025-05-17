const express = require('express');
let app = express();
const port = 3000;
const path = require('path');
const ejsMate = require('ejs-mate');
const Override = require('method-override');
const wrapAsync = require('./utily/wrapAsync.js');
const expressError = require('./utily/expressError.js');
const { keydataSchema } = require('./joi.js');

// database
const mongoose = require('mongoose');
const KeyDwellSchema = require('./models/schema');

main()
    .then(() => {
        console.log(`database is connected`)
    }).catch((err) => {
        console.log(err)
    });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/KeyDwell');
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
// error handling of form
const keydataValidation = (req,res,next) =>{
    let {error} = keydataSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el =>el.message).join(",")
        throw new expressError(400 , errMsg);
    }else{
        next();
    }
}
// Server route

app.get("/Keydwell/home", wrapAsync(async (req, res) => {
    let homedata = await KeyDwellSchema.find({});
    res.render('ejs/home.ejs', { homedata });
}));
// create route
app.get("/Keydwell/create", (req, res) => {
    res.render('ejs/create.ejs')
});
app.post("/Keydwell/home",keydataValidation, wrapAsync(async (req, res) => {
    let createdata = new KeyDwellSchema(req.body.newhome);
    console.log(createdata);
    await createdata.save();
    res.redirect('/Keydwell/home');
}));
// update route
app.get("/Keydwell/:id/Update", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let updatedata = await KeyDwellSchema.findById(id);
    res.render('ejs/update.ejs', { updatedata });
}));
app.put("/Keydwell/show/:id",keydataValidation, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await KeyDwellSchema.findByIdAndUpdate(id, { ...req.body.updatedata });
    res.redirect(`/Keydwell/show/${id}`);
}));

// delete route
app.delete("/Keydwell/show/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedata = await KeyDwellSchema.findByIdAndDelete(id);
    console.log(deletedata);
    res.redirect('/Keydwell/home');
}));

app.get("/Keydwell/show/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let showdata = await KeyDwellSchema.findById(id);
    res.render('ejs/show.ejs', { showdata });
}));

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
