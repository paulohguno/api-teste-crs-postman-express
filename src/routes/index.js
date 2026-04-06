import vetorRouts from "./vetorRout.js"
import tarefaRoutes from "./tarefaRoutes.js"

function Routes(app){
    tarefaRoutes(app)
    vetorRouts(app)
    
}

export default Routes
