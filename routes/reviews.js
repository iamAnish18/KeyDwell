const express = require('express');
const route = express.Router({mergeParams : true});
const Reviews = require('../models/review.js');
const expressError = require('../utily/expressError.js');
const {reviewsSchema } = require('../joi.js');
const wrapAsync = require('../utily/wrapAsync.js');
const KeyDwellSchema = require('../models/schema');


const reviewsValidation = (req, res, next) => {
    let { error } = reviewsSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",")
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}

route.post("/Keydwell/:id/reviews", reviewsValidation, async (req, res) => {
    let hotelreview = await KeyDwellSchema.findById(req.params.id);
    let newreview = new Reviews(req.body.reviews);

    hotelreview.reviews.push(newreview);
    await hotelreview.save();
    await newreview.save();
    res.redirect(`/Keydwell/show/${hotelreview._id}`);
});
// reviews delete route
route.delete("/Keydwell/:id/reviews/:reviewsId", wrapAsync(async (req, res) => {
    let { id, reviewsId } = req.params;
    await KeyDwellSchema.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
    await Reviews.findByIdAndDelete(reviewsId);
    res.redirect(`/Keydwell/show/${id}`);
}));

module.exports = route;
