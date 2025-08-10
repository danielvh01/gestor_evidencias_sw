require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
        secret: process.env.JET_SECRET || 'notasecreta'
    }
    ,
    sql:{
        server: process.env.DB_HOST || 'localhost:1433',
        user: process.env.DB_USER || 'forense_app_user',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'forense_app'
    }

}