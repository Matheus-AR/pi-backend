require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ erro: 'Token não enviado' });
    }

    const [tipo, token] = authorization.split(" ");

    if (!token) {
        return res.status(401).json({ erro: 'Token inválido' });
    }

    jwt.verify(token, process.env.SECRET, (error, userInfo) => {
        if(error){
            return res.status(401).json({ erro: 'Token inválido' });
        }
        req.body.id = userInfo.id;
    });
    
    next();
}