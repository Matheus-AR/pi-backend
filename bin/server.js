const app = require('../src/app');

const porta = 3000;
app.listen(porta, function() {
    console.log(`API ouvindo na porta ${porta}`);
});