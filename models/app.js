var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    codigo: {
    type: String,
    required: true,
    unique: true
}
});

const App = mongoose.model('App', esquema);
module.exports = App;