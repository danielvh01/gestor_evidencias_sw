const TABLA = 'dcri_evidencia';



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
        return db.uno(TABLA,id,'evi_expediente_id');
    }

    function agregar(body)
    {
        return db.agregar(TABLA,body, 'evi_id');
    }

    function actualizar(id, body) {
        return db.actualizar(TABLA, id, body, 'evi_id');
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