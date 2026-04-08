
import DadosUsuarios from "./modelsUsuarios.js";
import Planos from "./modelsPlanos.js";
import PerfisUsuarios from "./modelsPerfisUsuarios.js";
import Historico from "./modelsHistorico.js";
import Genero from "./modelsGenero.js";
import Temporada from "./modelsTemporada.js";
import Sinopse from "./modelsSinpse.js";
import Autores from "./modelsAutores.js";
import SinopseAutores from "./modelsSeriesEAutores.js";
import SinopseGenero from "./modelsSinGenero.js";
import SinopseTemporada from "./modelsSinTemporada.js";

Temporada.belongsToMany(Sinopse, {
    as: 'sinopses',
    through: SinopseTemporada,
    foreignKey: 'id_temporada',
    otherKey: 'id_sinopse'
});

Genero.belongsToMany(Sinopse, {
    as: 'sinopses',
    through: SinopseGenero,
    foreignKey: 'id_genero',
    otherKey: 'id_sinopse'
});

Autores.belongsToMany(Sinopse, {
    as: 'sinopses',
    through: SinopseAutores,
    foreignKey: 'id_autor',
    otherKey: 'id_sinopse'
});


(async () => {
    try {
        const syncOptions = { alter: true };

        await Planos.sync(syncOptions);
        await DadosUsuarios.sync(syncOptions);
        await PerfisUsuarios.sync(syncOptions);
        await Genero.sync(syncOptions);
        await Temporada.sync(syncOptions);
        await Autores.sync(syncOptions);
        await Sinopse.sync(syncOptions);
        await SinopseAutores.sync(syncOptions);
        await SinopseGenero.sync(syncOptions);
        await SinopseTemporada.sync(syncOptions);
        await Historico.sync(syncOptions);
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error.message);
    }
})();