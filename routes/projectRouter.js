const express = require("express");
const projectModel = require('../models/project.js')
const projectRouter = express.Router()
const routeGuard = require('../customdependance/authGuard')
const upload = require('../customdependance/multer.js')


projectRouter.get('/projects', async (req, res) => {
    try {
        res.render("main.twig")
    } catch (err) {
        res.send(err);
    }
})

projectRouter.post('/addProjects', upload.single('image'), async (req, res) => {
    try {
        req.body.image = req.file.filename
        let newProject = new projectModel(req.body)
        await newProject.save()
        res.redirect("/projects")
    } catch (err) {
        res.send(err);
    }
})

projectRouter.get('/addProjects', routeGuard, async (req, res) => {
    try {
        res.render("addProject.twig")
    } catch (err) {
        res.send(err);
    }
})

projectRouter.get('/displayprojects', async (req, res) => {
    try {
        let projects = await projectModel.find();
        res.render("displayproject.twig", {
            projects: projects
        })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = projectRouter