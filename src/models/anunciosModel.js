const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [ true, 'O título é obrigatório']
    },
    descricao: {
        type: String,
        required: [ true, 'A descrição é obrigatória']
    },
    categoria: {
        type: String,
        required: [ true, 'A categoria é obrigatória']
    },
    preco: {
        type: Number,
        required: [ true, 'O preço é obrigatório']
    },
    anunciante: {
        type: String,
        required: [ true, 'O anunciante é obrigatório']
    },
    cidade: {
        type: String,
        required: [true, 'A cidade é obrigatório']
    },
    contato: {
        type: String,
        required: [ true, 'O contato é obrigatório']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Anuncio', anuncioSchema);