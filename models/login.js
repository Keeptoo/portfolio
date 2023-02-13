const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    firstname:{
        type: String,
        required: [true, 'Pas de Prenom'],
    },
    password: {
        type: String,
        required: [true, 'Pas de mot de passe'],
    },

})

const LoginModel = mongoose.model('Login', LoginSchema);
module.exports = LoginModel