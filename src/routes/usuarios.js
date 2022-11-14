const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios');

router.post('/', usuariosController.criarUsuario);

router.put('/:id', usuariosController.alterarUsuario);

router.delete('/:id', usuariosController.removerUsuario);

module.exports = router;