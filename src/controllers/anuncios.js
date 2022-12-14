const { ObjectId } = require('bson');
const Anuncio = require('../models/anunciosModel');
const Usuario = require('../models/usuariosModel');

async function listarPorCidade(req, res, next){
    await Anuncio.find({cidade: req.query.cidade})
        .then(anuncios => { 
            if (anuncios) return res.status(200).json(anuncios);
            else return res.status(404).json({ erro: 'Não foram encontrados anúncios dessa cidade' })
        })
        .catch(error => { 
            return res.status(500).json({ erro: error.message }) 
        });
};

async function listarPorCategoria(req, res, next){
    await Anuncio.find({categoria: req.query.categoria})
        .then(anuncios => { 
            if (anuncios) return res.status(200).json(anuncios);
            else return res.status(404).json({ erro: 'Não foram encontrados anúncios dessa categoria' })
        })
        .catch(error => { 
            return res.status(500).json(error) 
        });
};

async function listarAnuncios(req, res, next){
    await Anuncio.find({})
        .then(anuncios => { 
            return res.status(200).json(anuncios)
        })
        .catch(error => { 
            return res.status(500).json(error)
        });
};

async function listarPorId(req, res, next){
    await Anuncio.findOne({_id: ObjectId(req.params.id)})
        .then(anuncio => {
            if (anuncio) return res.status(200).json(anuncio);
            else return res.status(404).json({ erro: 'Anúncio não encontrado' });
        })
        .catch(error => { 
            return res.status(500).json({ erro: error.message}) 
        });
};

async function criarAnuncio(req, res, next){
    const idAutorizacao = req.body.id
    const { emailAnunciante } = req.body;
    const usuario = await Usuario.findOne({ email: emailAnunciante })

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não cadastrado' });
    }

    if (idAutorizacao !== String(usuario._id)) {
        return res.status(401).json({ erro: 'Não autorizado' });
    }
    const anuncio = new Anuncio(req.body);
    await anuncio.save()
        .then(doc => { 
            return res.status(201).json(doc)
        })
        .catch(error => {
            const msg = {};
            if (error.errors) {
                Object.values(error.errors).forEach(({properties}) => {
                    msg[properties.path] = properties.message;
                });
            }
            return res.status(422).json(msg);
        });
};

async function alterarAnuncio(req, res, next){
    const usuario = await Usuario.findOne({_id: ObjectId(req.body.id)})
    await Anuncio.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body, { runValidators: true})
        .then(anuncio => {
            if (anuncio.emailAnunciante !== usuario.email) {
                return res.status(401).json({ erro: 'Não autorizado'});
            }
            if (anuncio) {
                console.log(anuncio);
                return res.status(204).end();
            }
            else return res.status(404).json({ erro: 'Anúncio não encontrado' });
        })
        .catch(error => {
            const msg = {};
            if (error.errors) {
                Object.values(error.errors).forEach(({ properties }) =>{
                    msg[properties.path] = properties.message;
                });
            }
            return res.status(422).json(msg);
        });
};

async function removerAnuncio(req, res, next){
    const usuario = await Usuario.findOne({_id: ObjectId(req.body.id)})
    await Anuncio.findOneAndDelete({_id: ObjectId(req.params.id)})
        .then(anuncio => {
            if (anuncio.emailAnunciante !== usuario.email) {
                return res.status(401).json({ erro: 'Não autorizado' })
            }
            if (anuncio) {
                return res.status(204).end();
            } else {
                return res.status(404).json({ erro: 'Anúncio não encontrado' });
            }
        })
        .catch(error => {
            return res.status(422).json({ erro: error.message });
        });
}

module.exports = { listarPorCidade, listarPorCategoria, listarAnuncios, listarPorId, criarAnuncio, alterarAnuncio, removerAnuncio };