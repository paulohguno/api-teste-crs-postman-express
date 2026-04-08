import temporadaController from "../controllers/controllerTemporada.js";

export default (app) => {
    app.get('/temporada', temporadaController.get);
    app.post('/temporada/create', temporadaController.create);
    app.get('/temporada/getcomid/:id', temporadaController.getcomid);
    app.delete('/temporada/destroy/:id', temporadaController.destroy);
    app.patch('/temporada/update/:id', temporadaController.update);
};