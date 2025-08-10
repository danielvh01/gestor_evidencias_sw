// db/mssql.js
const sql = require('mssql');
const config = require('../config');

const dbconfig = {
    server: config.sql.server,
    user: config.sql.user,
    password: config.sql.password,
    database: config.sql.database,
    options: {
        encrypt: false,               // Desactivar para local
        trustServerCertificate: true  // Necesario para dev
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let pool;

async function conSql() {
    try {
        if (pool) {
            await pool.close();
        }
        pool = await sql.connect(dbconfig);
        console.log('DB CONECTADA!');
    } catch (err) {
        console.error('[db err]', err);
        setTimeout(conSql, 2000);
    }
}

conSql();

async function todos(tabla) {
    try {
        const result = await pool.request().query(`SELECT * FROM ${tabla}`);
        return result.recordset;
    } catch (err) {
        throw err;
    }
}

async function uno(tabla, id, idColumn = 'id') {
    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * FROM ${tabla} WHERE ${idColumn} = @id`);
        return result.recordset;
    } catch (err) {
        throw err;
    }
}

async function agregar(tabla, data, idColumn = null) {
    try {
        const dataFiltrada = idColumn
            ? Object.fromEntries(
                Object.entries(data).filter(([key]) => key.toLowerCase() !== idColumn.toLowerCase())
              )
            : data;

        const keys = Object.keys(dataFiltrada).map(k => `[${k}]`).join(', ');
        const values = Object.keys(dataFiltrada).map((k, i) => `@val${i}`).join(', ');

        const request = pool.request();
        Object.values(dataFiltrada).forEach((val, i) => {
            request.input(`val${i}`, val);
        });

        let query;
        if (idColumn) {
            // Si se especifica idColumn, devolver el nuevo ID
            query = `
                INSERT INTO ${tabla} (${keys})
                OUTPUT INSERTED.${idColumn}
                VALUES (${values})
            `;
        } else {
            // Si no hay columna IDENTITY que recuperar
            query = `INSERT INTO ${tabla} (${keys}) VALUES (${values})`;
        }

        const result = await request.query(query);

        if (idColumn) {
            return result.recordset[0][idColumn];
        }
        return result.rowsAffected[0];

    } catch (err) {
        throw err;
    }
}



async function actualizar(tabla, id, data, idColumn = 'id') {
    try {
        console.log(data);

        const dataFiltrada = idColumn
            ? Object.fromEntries(
                Object.entries(data).filter(([key]) => key.toLowerCase() !== idColumn.toLowerCase())
              )
            : data;

        const setClause = Object.keys(dataFiltrada).map((k, i) => `[${k}] = @val${i}`).join(', ');

        const request = pool.request();
        Object.values(dataFiltrada).forEach((val, i) => {
            request.input(`val${i}`, val);
        });
        request.input('id', sql.Int, id);

        const result = await request.query(`UPDATE ${tabla} SET ${setClause} WHERE ${idColumn} = @id`);
        return result.rowsAffected[0];
    } catch (err) {
        throw err;
    }
}

async function eliminar(tabla, id, idColumn = 'id') {
    try {
        const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`DELETE FROM ${tabla} WHERE ${idColumn} = @id`);
    return result.rowsAffected[0];
    } catch (err) {
        throw err;
    }
}

async function query(tabla, conditions) {
    try {
        const keys = Object.keys(conditions);
        const clauses = keys.map((k, i) => `[${k}] = @val${i}`).join(' AND ');

        const request = pool.request();
        Object.values(conditions).forEach((val, i) => {
            request.input(`val${i}`, val);
        });

        const result = await request.query(`SELECT * FROM ${tabla} WHERE ${clauses}`);
        return result.recordset;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    todos,
    uno,
    agregar,
    actualizar,
    eliminar,
    query
};
