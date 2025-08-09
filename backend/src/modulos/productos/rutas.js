const express = require('express');

const respuesta = require('../../red/respuestas');

const controlador = require('./index');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/',agregar)
router.delete('/:id',eliminar);
router.put('/:id', actualizar);


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
                mensaje = 'Producto guardado con exito';
            }
            else {
                mensaje = 'Producto actualizado con exito';

            }
        respuesta.success(req,res,mensaje,200);
    }
    catch(err){
        next(err);
    }
};

async function actualizar(req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await controlador.actualizar(id, data);
        respuesta.success(req, res, 'Producto actualizado con éxito', 200);
    } catch (err) {
        next(err);
    }
}


async function eliminar(req,res,next){
    try{
        const id = req.params.id;
        const result = await controlador.eliminar(id);
        respuesta.success(req,res,'Producto eliminado satisfactoriamente',200);
    }
    catch(err){
        next(err);
    }
};

module.exports = router;