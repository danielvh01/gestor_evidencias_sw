const jwt = require('jsonwebtoken');
//const auth = require('../modulos/auth');
const config = require('../config');

const secret = config.jwt.secret;
const error = require('../middleware/errores')


function verificarToken(token){
    return jwt.verify(token,secret);
}

function asignarToken(data)
{
    return jwt.sign(data,secret);
}

const chequearToken = {
    confirmarToken: function(req,id){
        const decodificado = decodificarCabecera(req);
        
        //Aqui se podria hacer validacion de roles en base a id
        //if(decodificado.id !== id)
          //  {
            //    throw error('No tienes privilegios para ejecutar esta accion',401);
           // }
        }
    
}

function obtenerToken(autorizacion){
    if(!autorizacion)
        {
            throw error('No viene token',401);
        }
    if(autorizacion.indexOf('Bearer') === -1){
        throw error('Formato invalido',401);
    }

    let token = autorizacion.replace('Bearer ','');
    return token;
}

function decodificarCabecera(req){
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;
    return decodificado;
}

module.exports = {
    chequearToken,
    asignarToken
    
}

