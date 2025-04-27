const mongoose = require("mongoose");
const dataDb = require("./data");
const HomeKey = require("../models/schema")

main()
    .then(() => {
        console.log('database is connected')
    }).catch(err => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/final');
}

const MainData = async() =>{
    await HomeKey.deleteMany({});
    await HomeKey.insertMany(dataDb.data);
    console.log('it is start')
}

const hello = MainData();
console.log(hello);
