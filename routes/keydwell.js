const express = require('express');
const route = express.Router();
const { keydataSchema } = require('../joi.js');
const wrapAsync = require('../utily/wrapAsync.js');
const KeyDwellSchema = require('../models/schema');
const expressError = require('../utily/expressError.js');
const keydataValidation = (req, res, next) => {
    let { error } = keydataSchema.validate(req.body.newhome);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",")
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}
// Index route
route.get("/home", wrapAsync(async (req, res) => {
    let homedata = await KeyDwellSchema.find({});
    res.render('ejs/home.ejs', { homedata });
}));
// create route
route.get("/create", (req, res) => {
    res.render('ejs/create.ejs')
});
// wrapAsync used better then try and catch functions
route.post("/home", keydataValidation, wrapAsync(async (req, res) => {
    let createdata = new KeyDwellSchema(req.body.newhome);
    await createdata.save();
    req.flash("success", "New route create Successful");
    res.redirect('/Keydwell/home');
}));
// update route
route.get("/:id/Update", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let updatedata = await KeyDwellSchema.findById(id);
    if(!updatedata){
        req.flash("error" ,"To finding the listing is deleted");
        res.redirect('Keydwell/home');
    }
    res.render('ejs/update.ejs', { updatedata });
}));
route.put("/show/:id", keydataValidation, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await KeyDwellSchema.findByIdAndUpdate(id, { ...req.body.updatedata });
    req.flash("success", "Successfull Update your listing");
    res.redirect(`/Keydwell/show/${id}`);
}));

// delete route
route.delete("/show/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedata = await KeyDwellSchema.findByIdAndDelete(id);
    console.log(deletedata);
    req.flash("success", "Successfull delete your listing")
    res.redirect('/Keydwell/home');
}));

route.get("/show/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let showdata = await KeyDwellSchema.findById(id).populate('reviews');
    if(!showdata){
        req.flash("error" , "To finding the listing is deleted");
        res.redirect('Keydwell/home');
    }
    res.render('ejs/show.ejs', { showdata });
}));

module.exports = route;
