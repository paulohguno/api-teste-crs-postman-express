
import Autenticacao from "../controllers/controllerAutentic.js";


export default (app) => {
    app.get('/autentic', Autenticacao.get);
    app.post('/autentic/register', Autenticacao.register);
    app.post('/autentic/login', Autenticacao.login);
    app.get('/autentic/user', Autenticacao.getUserByToken);
};