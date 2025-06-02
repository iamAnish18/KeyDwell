const KeyDwellSchema = require('./models/schema');
const keydataSchema = require('./joi');
const reviewsSchema = require('./joi');
const expressError = require('./utily/expressError');
const Reviews = require('./models/review');

module.exports.checktoLogin = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "Login must be required to create new listing");
        return res.redirect('/login');
    }
    return next()
}

module.exports.saveredirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirecturl = req.session.redirectUrl;
    }
    return next();
}

module.exports.isOwner = async (req,res,next) => {
    let { id } = req.params;
    let listingupdata = await KeyDwellSchema.findById(id);
    if(!listingupdata.owner.equals(res.local.currentUser._id)){
        req.flash("error" , "you don't have permission to edit");
        return res.redirect(`/Keydwell/show/${id}`)
    }
    next();
}

module.exports.keydataValidation = (req,res,next) =>{
    let { error } = keydataSchema.validate(req.body.newhome);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",")
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}
module.exports.reviewsValidation = (req,res,next) =>{
    let { error } = reviewsSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",")
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}
module.exports.isreviewAuthor = async (req,res,next) => {
    let { reviewsId } = req.params;
    let review = await Reviews.findById(reviewsId);
    if(!review.author.equals(res.local.currentUser._id)){
        req.flash("error" , "you don't have permission to reviwes");
        return res.redirect(`/Keydwell/show/${id}`)
    }
    next();
}
