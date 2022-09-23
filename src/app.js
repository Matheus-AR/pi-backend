const express = require('express');

const anunciosRoutes = require('./routes/anuncios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/anuncios', anunciosRoutes);


module.exports = app;