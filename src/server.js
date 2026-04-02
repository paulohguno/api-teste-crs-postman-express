import express from 'express'
const app = express()
app.use(express.json());

const vetor = [
    {
    terefa : "teste",
    data : new Date(Date.now()),
    finalizado : true
},
{
    terefa : "teste2",
    data : new Date(Date.now()),
    finalizado : false
}
]


app.get('/getarray/:index', (req, res) => {
    const index = req.params.index
    res.json(vetor[index])
})

app.put('/updatearray/:index', (req, res) => {
    const index = req.params.index
    vetor[index] = req.body
    res.json(vetor[index])
})

app.delete('/deletearray/:index', (req, res) => {
    const index = req.params.index
    vetor.splice(index, 1)
    return res.json()
})




app.listen(3333, () => {
    console.log('Server is running on port 3333')
})