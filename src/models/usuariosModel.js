const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        minLength: [3, 'O nome deve ter no minímo 3 caracteres'],
        required: [true, 'Por favor, insira seu nome']
    },
    email: {
        type: String,
        requried: [true, 'Por favor, indique um e-mail dee contato']
    },
    senha: {
        type: String,
        required: [true, 'Por favor, crie uma senha para sua conta']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);