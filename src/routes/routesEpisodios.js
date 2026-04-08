import episodiosController from "../controllers/controllerEpisodios.js";

export default (app) => {
    app.get('/episodios', episodiosController.get);
    app.post('/episodios/create', episodiosController.create);
    app.get('/episodios/getcomid/:id', episodiosController.getcomid);
    app.delete('/episodios/destroy/:id', episodiosController.destroy);
    app.patch('/episodios/update/:id', episodiosController.update);
};