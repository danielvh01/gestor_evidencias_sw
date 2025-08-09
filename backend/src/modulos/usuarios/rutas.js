const express = require('express');

const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

router.get('/',seguridad(),todos);
router.get('/:id',seguridad(), uno);
router.post('/',agregar)
router.delete('/:id',seguridad(), desactivar);

async function todos(req,res,next){
    
    try{
        const items = await controlador.todos();
        respuesta.success(req,res,items,200)
    }
    catch(err){
        next(err);
    }
};

async function uno(req,res,next){
    try{
        const items = await controlador.uno(req.params.id);
        respuesta.success(req,res,items,200);
    }
    catch(err){
        next(err);
    }
};

async function agregar(req,res,next){
    try{
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0)
            {
                mensaje = 'Item guardado con exito';
            }
            else {
                mensaje = 'Item actualizado con exito';

            }
        respuesta.success(req,res,mensaje,200);
    }
    catch(err){
        next(err);
    }
};

async function desactivar(req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await controlador.desactivar(id, data);
        respuesta.success(req, res, 'Usuario desactivado.', 200);
    } catch (err) {
        next(err);
    }
}

module.exports = router;