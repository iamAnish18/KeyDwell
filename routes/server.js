const express = require('express');
const route = express.Router();

const Cookies = require('cookie-parser');

route.use(Cookies("secreatecode"));
route.use("/greet" , (req,res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`Hello ${name}`)
})
route.get('/getcookies' , (req,res)=>{
    res.cookies("made-in" , "india" , {signed : true});
    res.send('it is passed by cookies')
});

route.get('/verified' , (req,res)=>{
    console.log(req.signedCookies);
    console.log('it is signed')
})

route.get("/" , (req,res)=>{
    console.dir(req.cookies);
    console.log('it is used')
});
module.exports = Cookies;
