import 'dotenv/config';
import express from 'express'
import routes from './routes/index.js';
import './models/index.js'
import fileUpload from 'express-fileupload';
const app = express()

app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}))


routes(app)



app.listen(process.env.API_PORT, () => {
    console.log('Server is running on port ' + process.env.API_PORT)
})

