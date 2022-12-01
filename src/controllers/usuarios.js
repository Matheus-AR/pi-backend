const { ObjectId } = require('bson');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuariosModel');

async function criarUsuario(req, res, next) {
    const usuario = new Usuario(req.body);
    await usuario.save()
        .then(doc => {
            doc.senha = undefined;
            return res.status(201).json(doc);
        })
        .catch(error => {
            const msg = {};
            if (error.errors) {
                Object.values(error.errors).forEach(({ properties })=> {
                    msg[properties.path] = properties.message;
                });
            }
            if (error.code == 11000) {
                msg["erro"] = "E-mail já registrado"
            }
            return res.status(422).json(msg);
        })
};

async function login(req, res, next) {
    const { email, senha } = req.body;
    await Usuario.findOne({ email: email }).select('+senha')
        .then(doc => {
            if (!doc) {
                return res.status(404).json({ erro: 'Usuário não cadastrado' });
            }
            const autentica = bcrypt.compareSync(senha, doc.senha);

            if (!autentica) {
                return res.status(401).json({ erro: 'Senha inválida' });
            }

            const token = jwt.sign({id: doc._id}, process.env.SECRET, { expiresIn: '1d'});
            return res.status(200).json({ email, token });
        })
        .catch(error => {
            return res.status(422).json({ erro: error.message });
        })
}


async function removerUsuario(req, res, next){
    await Usuario.findOneAndDelete({ _id: ObjectId(req.body.id)})
        .then(usuario => {
            if (usuario) return res.status(204).end();
            else return res.status(404).json({ erro: "Usuário não encontrado"});
        })
        .catch(error => {
            return res.status(500).json({ erro: error.message });
        });
}

module.exports = { criarUsuario, login, removerUsuario };