const express = require('express');
const route = express.Router({mergeParams : true});
const Reviews = require('../models/review.js');
const wrapAsync = require('../utily/wrapAsync.js');
const KeyDwellSchema = require('../models/schema');
const { checktoLogin , reviewsValidation ,isreviewAuthor} = require('../middleware.js');

route.post("/",checktoLogin, reviewsValidation, async (req, res) => {
    let hotelreview = await KeyDwellSchema.findById(req.params.id);
    let newreview = new Reviews(req.body.reviews);
    newreview.author = req.user._id;
    hotelreview.reviews.push(newreview);
    console.log(newreview);
    await hotelreview.save();
    await newreview.save();
    res.redirect(`/Keydwell/show/${hotelreview._id}`);
});
// reviews delete route
route.delete("/:reviewsId",isreviewAuthor,checktoLogin, wrapAsync(async (req, res) => {
    let { id, reviewsId } = req.params;
    await KeyDwellSchema.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
    await Reviews.findByIdAndDelete(reviewsId);
    res.redirect(`/Keydwell/show/${id}`);
}));

module.exports = route;
