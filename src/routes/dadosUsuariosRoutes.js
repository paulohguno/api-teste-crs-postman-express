import dadosUsuariosController from "../controllers/dadosUsuarioscontroller.js";


export default (app) => {
    app.get('/dadosUsuarios', dadosUsuariosController.get);
    app.post('/dadosUsuarios/create', dadosUsuariosController.create);
    app.get('/dadosUsuarios/getcomid/:id', dadosUsuariosController.getcomid);
    app.delete('/dadosUsuarios/destroy/:id', dadosUsuariosController.destroy);
    app.patch('/dadosUsuarios/update/:id', dadosUsuariosController.update);
};