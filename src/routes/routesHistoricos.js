import historicoController from "../controllers/controllerHistorico.js";

export default (app) => {
    app.get('/historico', historicoController.get);
    app.post('/historico/create', historicoController.create);
    app.get('/historico/getcomid/:id', historicoController.getcomid);
    app.delete('/historico/destroy/:id', historicoController.destroy);
    app.patch('/historico/update/:id', historicoController.update);
};