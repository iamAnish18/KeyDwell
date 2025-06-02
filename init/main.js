const mongoose = require('mongoose');
const KeyDwellSchema = require('../models/schema');
const KeyDwelldb = require('./data');
main()
    .then(() => {
        console.log(`database is connected`)
    }).catch((err) => {
        console.log(err)
    });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/KeyDwell');
}

let insert =async () =>{
    await KeyDwellSchema.deleteMany({});
    KeyDwelldb.data = KeyDwelldb.data.map((obj) =>
        ({ ...obj, owner: "683d5c6108d48739d1f88467" }));
    await KeyDwellSchema.insertMany(KeyDwelldb.data)
}

insert();
