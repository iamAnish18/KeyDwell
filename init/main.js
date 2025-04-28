const mongoose = require('mongoose');
const HomeKey = require('../models/schema');
const dataDb = require('./data');

main()
    .then(() => {
        console.log('Database is connected')
    })
    .catch(err => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/homeKey');
}

let HomeDb = async () =>{
    await HomeKey.deleteMany({});
    await HomeKey.insertMany(dataDb.data);
}

const hello = HomeDb();
console.log(hello);
