const usuarios = [];

function criarUsuario(req, res, next){
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
};

function alterarUsuario(req, res, next){
    const usuarioBuscado = usuarios.find(usuario => usuario.id === Number(req.params.usuarioId));
    if(!usuarioBuscado){
        return res.status(404).json({msg: "Usuario não existe"})
    }
    usuarioBuscado.nome = req.body.nome;
    usuarioBuscado.email = req.body.email;
    usuarioBuscado.senha = req.body.senha;
    
    res.status(204).end();
};

function removerUsuario(req, res, next){
    const posicaoDoUsuarioBuscado = usuarios.findIndex(usuario => usuario.id === Number(req.params.usuarioId));
    if (posicaoDoUsuarioBuscado < 0){
        return res.status(404).json({msg: "Usuario não existe"})
    }
    usuarios.splice(posicaoDoUsuarioBuscado, 1);
    res.status(204).end();
}

module.exports = { criarUsuario, alterarUsuario, removerUsuario };