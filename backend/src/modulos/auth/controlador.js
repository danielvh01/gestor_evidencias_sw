const TABLA = 'dcri_auth';
const auth = require('../../auth');
const bcrypt = require('bcrypt');


module.exports = function(dbinyectada){

    let db = dbinyectada;

    if(!db){
        db = require('../../DB/mssql');
    }
    
    async function login(usuario, password) {
        const data = await db.query(TABLA, { au_usuario: usuario });

        if (data.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const user = data[0]; // tomar la primera fila
        return bcrypt.compare(password, user.au_password)
            .then(resultado => {
                if (resultado) {
                    return auth.asignarToken({ ...user });
                } else {
                    throw new Error('Información inválida');
                }
            });
}


    async function agregar(data)
    {
        const authData = {
            au_id: data.id,
        }
        if(data.usuario){
            authData.au_usuario = data.usuario
        }
        if(data.password){
            authData.au_password = await bcrypt.hash(data.password.toString(),5);
        }
        return db.agregar(TABLA,authData);
    }

    return {
        agregar,
        login
    }
}