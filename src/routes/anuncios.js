const express = require('express');
const router = express.Router();

const anunciosController = require('../controllers/anuncios');

router.get('/', anunciosController.listarPorCidade, anunciosController.listarPorCategoria, anunciosController.listarAnuncios);

router.get('/:anuncioId', anunciosController.listarPorId);

router.post('/', anunciosController.criarAnuncio);

router.put('/:anuncioId', anunciosController.alterarAnuncio);

router.delete('/:anuncioId', anunciosController.removerAnuncio);

module.exports = router;