import dadosUsuariosRoutes from "./dadosUsuariosRoutes.js";
import perfisUsuariosRoutes from "./routesPerfisUsuarios.js";
import historicoRoutes from "./rotasHistoricos.js";

function Routes(app) {
    dadosUsuariosRoutes(app);
    perfisUsuariosRoutes(app);
    historicoRoutes(app);
}

export default Routes;
