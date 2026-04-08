import sinopseController from "../controllers/controllerSinpse.js"

export default (app) => {
    app.get('/sinopse', sinopseController.get);
    app.post('/sinopse/create', sinopseController.create);
    app.get('/sinopse/getcomid/:id', sinopseController.getcomid);
    app.delete('/sinopse/destroy/:id', sinopseController.destroy);
    app.patch('/sinopse/update/:id', sinopseController.update);
};