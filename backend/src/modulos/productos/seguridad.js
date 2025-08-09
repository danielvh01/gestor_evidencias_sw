const auth = require('../../auth');

module.exports = function chequearAutenticacion(){
    function middleware(req,res,next){
        const id = req.body.iq;
        auth.chequearToken.confirmarToken(req,id)
        next();
    }
    return middleware
}