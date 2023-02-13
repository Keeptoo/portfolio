const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    liengithub: {
        type: String,
        required: [true, 'Pas de lien github'],
    },
    liensourcegithub: {
        type: String,
        required: [true, 'Pas de lien source github'],
    },
    image:{
        type: String,
        required: [true, "Pas d'image"]
    }
})

const projectModel = mongoose.model('Projects', projectSchema);

module.exports = projectModel