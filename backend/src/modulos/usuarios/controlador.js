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
            usr_id: body.usr_id,
            usr_nombre_completo: body.usr_nombre_completo,
            usr_rol_id: body.usr_rol_id,
            usr_activo: body.usr_activo
        }
        var insertId = 0;

        if(body.usr_id == 0){
            const respuesta = await db.agregar(TABLA,usuario,'usr_id');
            insertId = respuesta;
        }else {
            insertId = body.usr_id;
            var respuesta = await db.actualizar(TABLA,insertId,usuario,'usr_id');
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