import controller from "../controllers/tarefaController.js"

export default (app) => {
    app.get('/tarefas', controller.get)
    app.post('/tarefas/create', controller.create)
    app.get('/tarefas/puxarcomid/:id', controller.puxarcomid)
    app.delete('/tarefas/destroy/:id', controller.destroy)
    app.patch('/tarefas/update/:id', controller.update)
}