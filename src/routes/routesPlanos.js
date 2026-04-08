import planosController from "../controllers/controllerPlanos.js";

export default (app) => {
    app.get('/planos', planosController.get);
    app.post('/planos/create', planosController.create);
    app.get('/planos/getcomid/:id', planosController.getcomid);
    app.delete('/planos/destroy/:id', planosController.destroy);
    app.patch('/planos/update/:id', planosController.update);
};