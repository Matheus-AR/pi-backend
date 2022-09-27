const anuncios = [
    {
        id: 1,
        titulo: "Anuncio 1",
        descricao: "Este é um anuncio de teste.",
        categoria: "Básico",
        preco: 12.12,
        anunciante: "Matheus",
        cidade: "Brasília",
        contato: "1111-1111"
    },
    {
        id: 2,
        titulo: "Anuncio 2",
        descricao: "Este é um anuncio de teste.",
        categoria: "Básico",
        preco: 13.23,
        anunciante: "Matheus",
        cidade: "Brasília",
        contato: "1111-1111",
    },
    {
        id: 3,
        titulo: "Anuncio 3",
        descricao: "Este é um anuncio de teste.",
        categoria: "Especial",
        preco: 120.00,
        anuncinate: "Maria",
        cidade: "Maceió",
        contato: "2222-2222"
    },
    {
        id:4,
        titulo: "Anuncio 4",
        descricao: "Este é um anuncio de teste.",
        categoria: "Especial",
        preco: 200.50,
        anunciante: "Jorge",
        cidade: "São Paulo",
        contato: "3333-3333"
    }
];

function listarPorCidade(req, res, next){
    const cidadeBuscada = req.query.cidade;
    const anunciosDaMesmaCidade = anuncios.filter(anuncio => anuncio.cidade === cidadeBuscada);
    res.status(200).json(anunciosDaMesmaCidade);
};

function listarPorCategoria(req, res, next){
    const categoriaBuscada = req.query.categoria;
    const anunciosDaMesmaCategoria = anuncios.filter(anuncio => anuncio.categoria === categoriaBuscada);
    res.status(200).json(anunciosDaMesmaCategoria);
};

function listarAnuncios(req, res, next){
    res.status(200).json(anuncios);
};

function listarPorId(req, res, next){
    const anuncioBuscado = anuncios.find(anuncio => anuncio.id === Number(req.params.anuncioId));
    if (!anuncioBuscado){
        return res.status(404).json({msg: "Anuncio não existe"});
    }
    res.status(200).json(anuncioBuscado);
};

function criarAnuncio(req, res, next){
    const novoAnuncio = {
        id: anuncios.length + 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        preco: req.body.preco,
        anunciante: req.body.anunciante,
        cidade: req.body.cidade,
        contato: req.body.contato
    }
    anuncios.push(novoAnuncio);
    res.status(201).json(novoAnuncio);
};

function alterarAnuncio(req, res, next){
    const anuncioBuscado = anuncios.find(anuncio => anuncio.id === Number(req.params.anuncioId));
    if (!anuncioBuscado){
        return res.status(404).json({msg: "Anuncio não existe"});
    }
    anuncioBuscado.titulo = req.body.titulo;
    anuncioBuscado.descricao = req.body.descricao;
    anuncioBuscado.categoria = req.body.categoria;
    anuncioBuscado.preco = req.body.preco;
    anuncioBuscado.cidade = req.body.cidade;
    anuncioBuscado.contato = req.body.contato;

    res.status(204).end();
};

function removerAnuncio(req, res, next){
    const indiceDoAnuncio = anuncios.findIndex(anuncio => anuncio.id === Number(req.params.anuncioId));
    if(!indiceDoAnuncio){
        return res.status(404).json({msg: "Anuncio não existe"})
    }
    anuncios.splice(indiceDoAnuncio, 1);
    res.status(204).end();
}

module.exports = { listarPorCidade, listarPorCategoria, listarAnuncios, listarPorId, criarAnuncio, alterarAnuncio, removerAnuncio };