import controller from "../controllers/controller.js"

export default function vetorRouts(app){
    app.get('/exemplo/:id', controller.puxarcomid)
}