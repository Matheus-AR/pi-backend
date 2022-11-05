const express = require('express');
const router = express.Router();

const anunciosController = require('../controllers/anuncios');

router.get('/', anunciosController.listarAnuncios);

router.get('/cidades', anunciosController.listarPorCidade);//

router.get('/categorias', anunciosController.listarPorCategoria);//

router.get('/:id', anunciosController.listarPorId);//

router.post('/', anunciosController.criarAnuncio);

router.put('/:id', anunciosController.alterarAnuncio);

router.delete('/:id', anunciosController.removerAnuncio);

module.exports = router;