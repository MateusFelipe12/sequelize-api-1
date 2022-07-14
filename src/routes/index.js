import categoriasRoute from "./categoriasRoute.js";
import autoresRoute from "./autoresRoute.js";

function Routes(app) {
	categoriasRoute(app);
	autoresRoute(app);
}

export default Routes;