const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        minLength: [3, 'O nome deve ter no minímo 3 caracteres'],
        maxLength: [50, 'O máximo de caracteres para o nome é 50'],
        required: [true, 'Por favor, insira seu nome']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'O e-mail é obrigatório'],
        validate: {
            validator: function(email){
                return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
            },
            message: '{VALUE} não é um e-mail válido'
        }
    },
    senha: {
        type: String,
        trim: true,
        select: false,
        required: [true, 'Por favor, crie uma senha para sua conta'],
        validate: {
            validator: function (senha){
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(senha);
            },
            message: '{VALUE}: A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caratere especial'
        }
    }
}, {
    timestamps: true
});

usuarioSchema.pre('save', function(next){
    const hash = bcrypt.hashSync(this.senha, 8);
    this.senha = hash;
    next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);