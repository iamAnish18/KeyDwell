const KeyDwellSchema = require('../models/schema');
const Reviews = require('../models/review');
module.exports.createReviews = async (req, res) => {
    let hotelreview = await KeyDwellSchema.findById(req.params.id);
    let newreview = new Reviews(req.body.reviews);
    newreview.author = req.user._id;
    hotelreview.reviews.push(newreview);
    console.log(newreview);
    await hotelreview.save();
    await newreview.save();
    res.redirect(`/Keydwell/show/${hotelreview._id}`);
}

module.exports.deleteReviews = async (req, res) => {
    let { id, reviewsId } = req.params;
    await KeyDwellSchema.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
    await Reviews.findByIdAndDelete(reviewsId);
    res.redirect(`/Keydwell/show/${id}`);
}
