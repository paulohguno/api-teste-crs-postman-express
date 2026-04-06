
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

const puxarcomid = (req, res) => {
    const id = req.params.id
    return res.json(vetor[id])
}

const pegar = (req, res) => {
    const index = req.params.index
    res.json(vetor[index])
}

const atualizar = (req, res) => {
    const index = req.params.index
    vetor[index] = req.body
    res.json(vetor[index])
}


const deletar = (req, res) => {
    const index = req.params.index
    vetor.splice(index, 1)
    return res.json()
}

export default {
    pegar,
    deletar ,
    atualizar,
    puxarcomid
}
