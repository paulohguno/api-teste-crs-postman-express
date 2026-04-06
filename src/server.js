import 'dotenv/config';
import express from 'express'
import routes from './routes/index.js';
import './models/index.js'
const app = express()

app.use(express.json());



routes(app)



app.listen(process.env.API_PORT, () => {
    console.log('Server is running on port ' + process.env.API_PORT)
})

