const db = require('../../DB/mssql');
const ctrl = require('./controlador');

module.exports = ctrl(db);