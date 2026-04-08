import generosController from "../controllers/controllerGenero";

export default (app) => {
    app.get('/generos', generosController.get);
    app.post('/generos/create', generosController.create);
    app.get('/generos/getcomid/:id', generosController.getcomid);
    app.delete('/generos/destroy/:id', generosController.destroy);
    app.patch('/generos/update/:id', generosController.update);
};