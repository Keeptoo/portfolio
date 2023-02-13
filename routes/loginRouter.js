const express = require("express");
const LoginModel = require('../models/login.js')
const LoginRouter = express.Router()
const nodemailer = require("nodemailer")
let crypto = require('../customdependance/crypto')
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "fonsat.nodemailer@gmail.com",
        pass: "dlclhbrybfcawlgi",
    },
});
LoginRouter.get('/login', async (req, res) => {
    try {
        res.render("Login.twig")
    } catch (err) {
        res.send(err);
    }
})

LoginRouter.post('/loginuser', async (req, res) => {
    try {
        let user = await LoginModel.findOne({ name: req.body.name})
        if (user) {
            if (await crypto.comparePassword(req.body.password, user.password)) {
                req.session.userId = user._id
                res.redirect('/addProjects')
            }else{
                res.send('mot de passe incorecte')
            }
        } else {
            res.send("Vous etes pas administrateur")
        }
    } catch (err) {
        res.send(err)
    }

})

LoginRouter.post('/user', async (req, res) => {
    try {
        req.body.password = await crypto.cryptPassword(req.body.password)
        let newUser = new LoginModel(req.body)
        await newUser.save()
        res.send('Utilisateur sauvegarder')
    } catch (error) {
        res.send(error)
    }
})

LoginRouter.get('/users', async (req, res) => {
    try {
        let users = await LoginModel.find();
        res.send(users)
    } catch (error) {
        res.send(err)
    }
})

LoginRouter.post('/sendMail', async (req, res) => {
    console.log(req.body);
    try {
        let info = await transporter.sendMail({
            from: req.body.mail, // sender address
            to: "nathanweber1706@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "de: " + req.body.email + " " + req.body.message, // plain text body
        });
        res.redirect('/projects')
    } catch (err) {
        res.send(err);
    }
});

module.exports = LoginRouter