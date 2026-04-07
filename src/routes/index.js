import dadosUsuariosRoutes from "./routesUsuarios.js";
import perfisUsuariosRoutes from "./routesPerfisUsuarios.js";
import historicoRoutes from "./routesHistoricos.js";
import Planos from "./routesPlanos.js"

function Routes(app) {
    dadosUsuariosRoutes(app);
    perfisUsuariosRoutes(app);
    historicoRoutes(app);
}

export default Routes;
