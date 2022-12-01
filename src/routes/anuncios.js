const express = require('express');
const router = express.Router();

const anunciosController = require('../controllers/anuncios');
const autenticacao = require('../middleware/authMiddleware');

router.get('/', anunciosController.listarAnuncios);

router.get('/cidades', anunciosController.listarPorCidade);//

router.get('/categorias', anunciosController.listarPorCategoria);//

router.get('/:id', anunciosController.listarPorId);//

router.post('/', autenticacao, anunciosController.criarAnuncio);

router.put('/:id',autenticacao, anunciosController.alterarAnuncio);

router.delete('/:id', autenticacao, anunciosController.removerAnuncio);

module.exports = router;