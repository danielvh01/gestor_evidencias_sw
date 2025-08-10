const TABLA = 'dcri_expediente';



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

    function agregar(body)
    {
        return db.agregar(TABLA,body, 'exp_id');
    }

    function actualizar(id, body) {
        return db.actualizar(TABLA, id, body);
    }

    function eliminar(id)
    {
        return db.eliminar(TABLA,id);
    }

    return {
        todos,
        uno,
        eliminar,
        agregar,
        actualizar
    }
}