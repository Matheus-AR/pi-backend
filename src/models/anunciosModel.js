const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    titulo: {
        type: String,
        trim: true,
        maxLength: [60, 'O título pode conter até 60 caracteres'],
        required: [ true, 'O título é obrigatório']
    },
    descricao: {
        type: String,
        trim: true,
        maxLength: [500, 'A descrição pode conter até 500 caracteres'],
        required: [ true, 'A descrição é obrigatória']
    },
    categoria: {
        type: String,
        trim: true,
        enum: {
            values: ['Imóveis', 'Autos e peças', 'Casa', 'Eletrônicos e celulares', 'Música e hobbies', 'Esportes e lazer', 'Artigos Infantis', 'Animais de estimação', 'Moda e beleza', 'Agro e indústria', 'Comércio e escritório', 'Serviços', 'Vagas de emprego', 'Outros'],
            message: '{VALUE} não suportado'
        },
        required: [ true, 'A categoria é obrigatória']
    },
    preco: {
        type: Number,
        min: [0.01, 'O preço deve ser maior zero'],
        required: [ true, 'O preço é obrigatório']
    },
    anunciante: {
        type: String,
        trim: true,
        minLength: [3, 'O nome do anunciante deve ter pelo menos 3 caracteres'],
        maxLength: [35, 'O nome do anuciante não pode passar de 35 caracteres'],
        required: [ true, 'O anunciante é obrigatório']
    },
    cidade: {
        type: String,
        trim: true,
        maxLength: [60, 'A cidade deve conter até 60 caracteres'],
        required: [true, 'A cidade é obrigatório']
    },
    contato: {
        type: String,
        trim: true,
        minLength: [13, 'O contato deve ter pelo menos 9 caracteres'],
        maxLength: [16, 'O contato deve ter até 12 caracteres'],
        required: [ true, 'O contato é obrigatório']
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Anuncio', anuncioSchema);