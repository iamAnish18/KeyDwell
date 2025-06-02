const express = require('express');
const route = express.Router();
const wrapAsync = require('../utily/wrapAsync.js');
const KeyDwellSchema = require('../models/schema');
const { checktoLogin, isOwner, keydataValidation } = require('../middleware.js');
const { populate } = require('../models/review.js');
// Index route
route.get("/home", wrapAsync(async (req, res) => {
    let homedata = await KeyDwellSchema.find({});
    res.render('ejs/home.ejs', { homedata });
}));
// create route
route.get("/create", checktoLogin, (req, res) => {
    res.render('ejs/create.ejs')
});
// wrapAsync used better then try and catch functions
route.post("/home", keydataValidation, wrapAsync(async (req, res) => {
    let createdata = new KeyDwellSchema(req.body.newhome);
    createdata.owner = req.user._id;
    await createdata.save();
    req.flash("success", "New route create Successful");
    res.redirect('/Keydwell/home');
}));
// update route
route.get("/:id/Update", checktoLogin, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let updatedata = await KeyDwellSchema.findById(id);
    if (!updatedata) {
        req.flash("error", "To finding the listing is deleted");
        res.redirect('Keydwell/home');
    }
    res.render('ejs/update.ejs', { updatedata });
}));
route.put("/show/:id", isOwner, keydataValidation, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await KeyDwellSchema.findByIdAndUpdate(id, { ...req.body.updatedata });
    req.flash("success", "Successfull Update your listing");
    res.redirect(`/Keydwell/show/${id}`);
}));

// delete route
route.delete("/show/:id", checktoLogin, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedata = await KeyDwellSchema.findByIdAndDelete(id);
    console.log(deletedata);
    req.flash("success", "Successfull delete your listing")
    res.redirect('/Keydwell/home');
}));

route.get("/show/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let showdata = await KeyDwellSchema.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('owner');
    if (!showdata) {
        req.flash("error", "To finding the listing is deleted");
        res.redirect('/Keydwell/home');
    }
    console.log(showdata);
    res.render('ejs/show.ejs', { showdata });
}));

module.exports = route;
