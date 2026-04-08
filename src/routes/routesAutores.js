import autoresController from "../controllers/controllerAutores.js";

export default (app) => {
    app.get('/autores', autoresController.get);
    app.post('/autores/create', autoresController.create);
    app.get('/autores/getcomid/:id', autoresController.getcomid);
    app.delete('/autores/destroy/:id', autoresController.destroy);
    app.patch('/autores/update/:id', autoresController.update);
};