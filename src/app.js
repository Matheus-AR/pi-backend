const express = require('express');

const anunciosRoutes = require('./routes/anuncios');
const usuariosRoutes = require('./routes/usuarios')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/anuncios', anunciosRoutes);
app.use('/usuarios', usuariosRoutes);

module.exports = app;