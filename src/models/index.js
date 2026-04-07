
import DadosUsuarios from "./dadosUsuariosModels.js";
import PerfisUsuarios from "./modelsPerfisUsuarios.js";
import Historico from "./modelsHistorico.js";

(async () => {
    await DadosUsuarios.sync({ force: true});
    await PerfisUsuarios.sync({ force: true});
    await Historico.sync({ force : true});
})();