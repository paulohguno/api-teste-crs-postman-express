
import DadosUsuarios from "./modelsUsuarios.js";
import Planos from "./modelsPlanos.js";
import PerfisUsuarios from "./modelsPerfisUsuarios.js";
import Historico from "./modelsHistorico.js";
import Genero from "./modelsGenero.js";
import Temporada from "./modelsTemporada.js";
import Sinopse from "./modelsSinpse.js";
import Autores from "./modelsAutores.js";


(async () => {
    await Planos.sync({ force: true});
    await DadosUsuarios.sync({ force: true});
    await PerfisUsuarios.sync({ force: true});
    await Genero.sync({ force: true});
    await Temporada.sync({ force: true});
    await Autores.sync({ force: true});
    await Sinopse.sync({ force: true});
    await Historico.sync({ force : true});
    
})();