const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config()
const projectRouter = require('./routes/projectRouter.js')
const LoginRouter = require('./routes/loginRouter.js');
const { array } = require('./customdependance/multer.js');
const db = process.env.BDD_URL
const app = express()

app.use(session({secret: "azerty",saveUninitialized: true,resave: true}));
app.use(express.static('./assets')); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(projectRouter)
app.use(LoginRouter)

app.listen(3000,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Je suis connecté');
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connecter a la bdd");
    }
})

app.all("*", (req,res)=>{
    res.redirect('/projects')
})

