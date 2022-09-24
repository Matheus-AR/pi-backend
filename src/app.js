const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const anunciosRoutes = require('./routes/anuncios');
const usuariosRoutes = require('./routes/usuarios')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/anuncios', anunciosRoutes);
app.use('/usuarios', usuariosRoutes);

module.exports = app;