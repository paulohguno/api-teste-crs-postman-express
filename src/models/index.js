import Tarefas from "./TarefaModel.js";
import TarefaUsuario from "./tarefaUsuario.js";

(async () => {
    await Tarefas.sync({ force: true});
    await TarefaUsuario.sync({ force: true});
})();