var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    hash: String,
    salt: String
});

const Usuario = mongoose.model('Usuario', esquema);
module.exports = Usuario;

//login: String, obrigatório hash: String, salt: String, 
//appsLiberados: Array com os códigos dos apps que o usuário possui acesso??????
