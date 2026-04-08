import dadosUsuariosRoutes from "./routesUsuarios.js";
import perfisUsuariosRoutes from "./routesPerfisUsuarios.js";
import historicoRoutes from "./routesHistoricos.js";
import Planos from "./routesPlanos.js"
import sinopseRoutes from "./routesSinpse.js";

function Routes(app) {
    dadosUsuariosRoutes(app);
    perfisUsuariosRoutes(app);
    historicoRoutes(app);
    sinopseRoutes(app);
}

export default Routes;
