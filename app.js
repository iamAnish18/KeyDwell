const express = require("express");
let app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//Mongoose
const mongoose = require('mongoose');
const HomeKey = require("./models/schema")

main()
    .then(() => console.log(`Database is connected`))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/final');
}

//Middleware
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);

//Index route
app.get("/HomeKey" , async (req,res)=>{
    let HomeList = await HomeKey.find({});
    res.render("index/list.ejs" , {HomeList})
});
//Creat Route
app.get("/HomeKey/add" , (req,res)=>{
    res.render("index/create.ejs")
})
app.post("/HomeKey" , async (req,res)=>{
    const newHome = new HomeKey(req.body.newhome);
    await newHome.save();
    res.redirect("/HomeKey");
});

//edit route
app.get("/HomeKey/:id/edit" , async(req,res)=>{
    let {id} = req.params;
    const newHomeid = await HomeKey.findByIdAndUpdate(id)
    res.render("index/edit.ejs" , {newHomeid});
})

app.put("/HomeKey/:id" , async (req,res)=>{
    let {id} = req.params;
    await HomeKey.findByIdAndUpdate(id , {...req.body.newHomeid});
    res.redirect(`/Homekey/${id}`);
})
//Delete route
app.delete("/HomeKey/:id" , async(req,res)=>{
    let {id} = req.params;
    let deleteitem = await HomeKey.findByIdAndDelete(id);
    console.log(deleteitem);
    res.redirect("/HomeKey")
})
//Show route
app.get("/HomeKey/:id" , async(req,res)=>{
    let {id} = req.params;
    const HomeList = await HomeKey.findById(id);
    res.render("index/detail.ejs" , {HomeList});
})
app.listen(port , ()=>{
    console.log(`Server is running ${port}`)
})
