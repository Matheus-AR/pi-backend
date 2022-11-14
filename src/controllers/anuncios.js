const { ObjectId } = require('bson');
const Anuncio = require('../models/anunciosModel');

async function listarPorCidade(req, res, next){
    await Anuncio.find({cidade: req.query.cidade})
        .then(anuncios => { 
            if (anuncios) return res.status(200).json(anuncios);
            else return res.status(404).json('Não foram encontrados anúncios dessa cidade')
        })
        .catch(error => { return res.status(500).json(error) });
};

async function listarPorCategoria(req, res, next){
    await Anuncio.find({categoria: req.query.categoria})
        .then(anuncios => { 
            if (anuncios) return res.status(200).json(anuncios);
            else return res.status(404).json('Não foram encontrados anúncios dessa categoria')
        })
        .catch(error => { return res.status(500).json(error) });
};

async function listarAnuncios(req, res, next){
    await Anuncio.find({})
        .then(anuncios => { return res.status(200).json(anuncios)})
        .catch(error => { return res.status(500).json(error)});
};

async function listarPorId(req, res, next){
    await Anuncio.findOne({_id: ObjectId(req.params.id)})
        .then(anuncio => {
            if (anuncio) return res.status(200).json(anuncio);
            else return res.status(404).json('Anúncio não encontrado');
        })
        .catch(error => { return res.status(500).json(error) });
};

async function criarAnuncio(req, res, next){
    const anuncio = new Anuncio(req.body);
    await anuncio.save()
        .then(doc => { return res.status(201).json(doc)})
        .catch(error => {
            const msgErro = {};
            Object.values(error.errors).forEach(({properties}) => {
                msgErro[properties.path] = properties.message;
            });
        });
};

async function alterarAnuncio(req, res, next){
    await Anuncio.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body, { runValidators: true})
        .then(anuncio => {
            if (anuncio) return res.status(204).end();
            else return res.status(404).json('Anúncio não encontrado');
        })
        .catch(error => { return res.status(500).json(error) });
};

async function removerAnuncio(req, res, next){
    await Anuncio.findOneAndDelete({_id: ObjectId(req.params.id)})
        .then(anuncio => {
            if (anuncio) return res.status(204).end();
            else return res.status(404).json('Anúncio não encontrado')
        })
        .catch(error => { return res.status(500).json(error)});
}

module.exports = { listarPorCidade, listarPorCategoria, listarAnuncios, listarPorId, criarAnuncio, alterarAnuncio, removerAnuncio };