const express = require('express');

const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

router.post('/login', login);
router.get('/login/:user', getRol);

async function login(req,res,next){
    try{
        const token = await controlador.login(req.body.usuario, req.body.password);
        respuesta.success(req,res,token,200);
    }
    catch(err){
        next(err);
    }
};


async function getRol(req,res,next){
    try{
        const item = await controlador.uno(req.params.user);
        respuesta.success(req,res,item,200);
    }
    catch(err){
        next(err);
    }
};

module.exports = router;