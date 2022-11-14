const { ObjectId } = require('bson');

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
            Object.values(error.errors).forEach(({ properties })=> {
                msg[properties.path] = properties.message;
            })
            console.log(error);
            return res.status(422).json(error);
        })
};

async function alterarUsuario(req, res, next){
    await Usuario.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body, { runValidators: true})
        .then(usuario => {
            if (usuario) return res.status(204).end();
            else return res.status(404).json({ erro: "Usuário não encontrado"});
        })
        .catch(error => {
            const msg = {};
            Object.values(error.errors).forEach(({ properties }) => {
                msg[properties.path] = properties.message;
            });
            return res.status(422).json(msg);
        });
};

async function removerUsuario(req, res, next){
    await Usuario.findOneAndDelete({ _id: ObjectId(req.params.id)})
        .then(usuario => {
            if (usuario) return res.status(201).end();
            else return res.status(404).json({ erro: "Usuário não encontrado"});
        })
        .catch(error => {
            return res.status(500).json(error);
        });
}

module.exports = { criarUsuario, alterarUsuario, removerUsuario };