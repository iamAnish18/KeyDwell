const KeyDwellSchema = require('../models/schema');
module.exports.indexRoute = async (req, res) => {
    let homedata = await KeyDwellSchema.find({});
    res.render('ejs/home.ejs', { homedata });
}

module.exports.createRoute = async (req, res) => {
    let createdata = new KeyDwellSchema(req.body.newhome);
    createdata.owner = req.user._id;
    await createdata.save();
    req.flash("success", "New route create Successful");
    res.redirect('/Keydwell/home');
}

module.exports.updata = async (req, res) => {
    let { id } = req.params;
    let updatedata = await KeyDwellSchema.findById(id);
    if (!updatedata) {
        req.flash("error", "To finding the listing is deleted");
        res.redirect('Keydwell/home');
    }
    res.render('ejs/update.ejs', { updatedata });
}

module.exports.updataRoute = async (req, res) => {
    let { id } = req.params;
    await KeyDwellSchema.findByIdAndUpdate(id, { ...req.body.updatedata });
    req.flash("success", "Successfull Update your listing");
    res.redirect(`/Keydwell/show/${id}`);
}

module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    let deletedata = await KeyDwellSchema.findByIdAndDelete(id);
    console.log(deletedata);
    req.flash("success", "Successfull delete your listing")
    res.redirect('/Keydwell/home');
}

module.exports.ShowRoute = async (req, res) => {
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
}
