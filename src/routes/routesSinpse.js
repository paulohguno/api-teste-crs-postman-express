import sinopseController from "../controllers/controllerSinpse.js"
import verifyToken from "../middlewares/verifyToken.js";
import admVerify from "../middlewares/verifyAdm.js";

export default (app) => {
    app.get('/sinopse', verifyToken, sinopseController.get);
    app.post('/sinopse/create', verifyToken, sinopseController.create);
    app.get('/sinopse/getcomid/:id', verifyToken, sinopseController.getcomid);
    app.delete('/sinopse/destroy/:id', verifyToken, sinopseController.destroy);
    app.patch('/sinopse/update/:id', verifyToken, sinopseController.update);
};