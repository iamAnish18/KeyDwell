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
route.get("/home",wrapAsync(async (req, res) => {
    let homedata = await KeyDwellSchema.find({});
    res.render('ejs/home.ejs', { homedata });
}));
// create route
route.get("/create", (req, res) => {
    res.render('ejs/create.ejs')
});
route.post("/home", keydataValidation, wrapAsync(async (req, res) => {
    let createdata = new KeyDwellSchema(req.body.newhome);
    console.log(createdata);
    await createdata.save();
    res.redirect('/Keydwell/home');
}));
// update route
route.get("/:id/Update", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let updatedata = await KeyDwellSchema.findById(id);
    res.render('ejs/update.ejs', { updatedata });
}));
route.put("/show/:id", keydataValidation, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await KeyDwellSchema.findByIdAndUpdate(id, { ...req.body.updatedata });
    res.redirect(`/Keydwell/show/${id}`);
}));

// delete route
route.delete("/show/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedata = await KeyDwellSchema.findByIdAndDelete(id);
    console.log(deletedata);
    res.redirect('/Keydwell/home');
}));

route.get("/show/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let showdata = await KeyDwellSchema.findById(id).populate('reviews');
    res.render('ejs/show.ejs', { showdata });
}));

module.exports = route;
