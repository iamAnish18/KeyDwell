const mongoose = require('mongoose');
const KeyDwellData = require('./data');
const KeyDwellListing = require('../models/schema');

main()
    .then(() => {
        console.log(`database is connected`)
    }).catch(err => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/KeyDwell');
}

let KeyDwellDb = async () => {
    await KeyDwellListing.deleteMany({});
    await KeyDwellListing.insertMany(KeyDwellData.data)
}
KeyDwellDb();
