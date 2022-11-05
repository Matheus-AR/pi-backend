require('dotenv').config();
const mongoose = require('mongoose');

const app = require('../src/app');

const porta = 3000;
const url = process.env.URL_DATABASE;
mongoose.connect(url)
    .then(() => {
        app.listen(porta, function() {
            console.log('Conectado ao MongoDB');
            console.log(`API ouvindo na porta ${porta}`);
        });
    })
    .catch(error => console.log(error));
