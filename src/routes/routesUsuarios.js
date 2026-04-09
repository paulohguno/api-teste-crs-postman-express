import dadosUsuariosController from "../controllers/controllerUsuarios.js";


export default (app) => {
    app.get('/dadosUsuarios', dadosUsuariosController.get);
    app.get('/dadosUsuarios/lancamentos/:id', dadosUsuariosController.getlancamentos);
    app.post('/dadosUsuarios/create', dadosUsuariosController.create);
    app.get('/dadosUsuarios/getcomid/:id', dadosUsuariosController.getcomid);
    app.delete('/dadosUsuarios/destroy/:id', dadosUsuariosController.destroy);
    app.patch('/dadosUsuarios/update/:id', dadosUsuariosController.update);
};