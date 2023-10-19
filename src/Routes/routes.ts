import { Express } from 'express';

const BancoRoutes = require('./routesModels/processoRoutes')


const TokenJWTmiddleware = require('../AuthJWT/jwtMiddleware')
const TokenVerify = require('../AuthJWT/jwtVerify')

function configRotas(app:Express) {
    app.use('/banco',TokenJWTmiddleware, BancoRoutes);//ok
}

export{configRotas}