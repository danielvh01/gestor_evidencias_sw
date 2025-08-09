const TABLA = 'dcri_usuario';
const auth = require('../auth');


module.exports = function(dbinyectada){

    let db = dbinyectada;

    if(!db){
        db = require('../../DB/mssql');
    }

    function todos()
    {
        return db.todos(TABLA);
    }

    function uno(id)
    {
        return db.uno(TABLA,id);
    }

    async function agregar(body)
    {
        const usuario ={
            usr_id: body.id,
            usr_nombre_completo: body.nombre,
            usr_rol_id: body.rol_id,
            usr_activo: body.activo
        }
        const respuesta = await db.agregar(TABLA,usuario,'usr_id');
        var insertId = 0;
        if(body.id == 0){
            insertId = respuesta;
        }else {
            insertId = body.id;
        }
        var respuesta2 = '';
        if(body.usuario || body.password){
             respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password

            })
        }
        return respuesta2
    }

    function desactivar(id, body) {
        return db.actualizar(TABLA, id, body, 'usr_id');
    }

    return {
        todos,
        uno,
        desactivar,
        agregar
    }
}