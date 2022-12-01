const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios');
const autenticacao = require('../middleware/authMiddleware');

router.post('/registro', usuariosController.criarUsuario);

router.post('/login', usuariosController.login);

router.delete('/:usuarioId', autenticacao, usuariosController.removerUsuario);

module.exports = router;