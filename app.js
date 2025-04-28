const express = require('express');
let app = express();
const port = 8080;
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const HomeKey = require('./models/schema');
const methodOverride = require("method-override");

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
//Middleware
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true}));
app.engine("ejs" , ejsMate);
app.use(methodOverride("_method"));

//Server

//index route
app.get("/homeKey" , async(req,res)=>{//pass
   let insertdata = await HomeKey.find({});
   res.render('index/list.ejs' , {insertdata});
});

//Create route
app.get("/homeKey/add" , (req,res)=>{//pass
    res.render('index/add.ejs');
});
app.post("/homeKey" , async(req,res)=>{
    const newHome = new HomeKey(req.body.newhome);
    await newHome.save();
    res.redirect('/homeKey');
});
//edit route
app.get("/homeKey/:id/edit", async (req, res) => {
    let { id } = req.params;
    let editHome = await HomeKey.findById(id);
    res.render('index/edit.ejs', { editHome });
});

// PUT to update the data
app.put("/homeKey/:id", async (req, res) => { 
    let { id } = req.params;
    await HomeKey.findByIdAndUpdate(id, { ...req.body.editHome});
    res.redirect(`/homeKey/${id}`);
});


//delete route
app.delete("/homeKey/:id" , async(req,res)=>{
    let {id} = req.params;
    let deleteHome = await HomeKey.findByIdAndDelete(id);
    console.log(deleteHome);
    res.redirect('/homeKey');
})
//show route
app.get("/homeKey/:id" ,async (req,res)=>{
    let {id} = req.params;
    let showData = await HomeKey.findById(id);
    res.render('index/show.ejs' , {showData});
})
app.listen(port , ()=>{
    console.log(`Server is running on ${port}`)
})
