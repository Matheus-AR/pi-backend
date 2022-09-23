const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios');

router.post('/', usuariosController.criarUsuario);

router.put('/:usuarioId', usuariosController.alterarUsuario);

router.delete('/:usuarioId', usuariosController.removerUsuario);

module.exports = router;