const mongoose = require('mongoose');
const initData = require('./data');
const Listings = require('../models/schema');

main()
    .then(() => { console.log('database is connected') })
    .catch(err => { console.log(err) })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WANDER');
}
const intDb = async() =>{
    await Listings.deleteMany({});
    await Listings.insertMany(initData.data);
    console.log('it is start')
}

intDb();
