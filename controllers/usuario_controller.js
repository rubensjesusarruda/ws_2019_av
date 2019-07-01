const Usuario = require('../models/usuario');
const App = require('../models/app');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const config = require('../config');







const senhaValida = (usuario, senha) => {
    let hash = crypto.pbkdf2Sync(senha, usuario.salt, 1000, 64, 'sha512').toString('hex');
    return usuario.hash === hash;
}
const geraJwt = (usuario) => {
    return jwt.sign({
            usuario: usuario.login
        },
        config.SECRET, //passado no arquivo
        { expiresIn: '2h' });// tempo de expiração do token
};

const controller = {
    
}


const controller = {
    registrar: (req, res) => {
        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(req.body.senha, salt, 1000, 64, 'sha512').toString('hex');
        let login = req.body.login;
        let usuario = {
            login,
            hash,
            salt
        };
        Usuario.create(usuario)
            .then(
                (usuarioRegistrado) => {
                    res.status(201).json(`Usuário ${usuarioRegistrado.login} registrado com sucesso`);
                },
                (erro) => {
                    if (erro.code == "11000") {
                        res.status(403).json("O usuário já existe");
                    } else {
                        console.log(erro);
                        res.status(500).json(erro);
                    }
                }
            );
    },
    
    
    liberar: (req, res) => {
    
    },
    
   
    login: (req, res) => {
        let login = req.body.login;
        let senha = req.body.senha;
        Usuario
            .findOne({ login })
            .exec()
            .then(
                (usuario) => {
                    if (!usuario) {
                        res.status(404).json('Usuário não encontrado');
                    } else if (senhaValida(usuario, senha)) {
                        let token = geraJwt(usuario);
                        let dados = { login, token };
                        res.json(dados);
                    } else {
                        res.status(403).json('Acesso negado');
                    }

                },
                (erro) => {
                    console.log(erro);
                    res.status(500).json(erro);
                }
            );
    },

    verificar: (req, res) => {
        let token = req.body.token;
        if(token) {
            const tokenDecodificado = decode(token);
            console.log(tokenDecodificado);
            let dataAtual = new Date();
            dataAtual.setDate(dataAtual.getDate());
            dataAtual = parseInt(dataAtual.getTime()/1000);
            if(tokenDecodificado.exp < dataAtual){
                res.status(403).json({acessoLiberado: false});
            }else{
                res.json({acessoLiberado: true});
            }
        }else{
            res.json({acessoLiberado: false});
        }
    }
};

module.exports = controller;