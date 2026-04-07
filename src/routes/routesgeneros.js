import Diretores from "../controllers/controllerGenero.js"

export default (app) => {
    app.get('/perfisUsuarios', perfisUsuariosController.get);
    app.post('/perfisUsuarios/create', perfisUsuariosController.create);
    app.get('/perfisUsuarios/getcomid/:id', perfisUsuariosController.getcomid);
    app.delete('/perfisUsuarios/destroy/:id', perfisUsuariosController.destroy);
    app.patch('/perfisUsuarios/update/:id', perfisUsuariosController.update);
};