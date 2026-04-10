import bcrypt from "bcrypt";


/////////////////////////////////////////////////////////
const createre = async (req, res) => {
    try {
        const{
            nome,
            email,
            senha,
        } = req.body;
        if (!nome || !email || !senha) {
            throw new Error('dados faltando');
        }


    }catch (error) {        res.status(400).send({
            type: 'error',
            message: error.message,
            data: []
        });
    }
};
    const register = async (req, res) => {
    if (usuarioExistente) {
        return res.status(400).send({
            type: 'error',
            message: 'usuario ja existe',
            data: []
        });
    }
            
const passwordHash = await bcrypt.hash(senha, 10);

const usuario = await Usuario.create({
    nome,
    email,
    senha: passwordHash
});

return res.status(201).send({
    type: 'sucess',
    message: 'usuario criado com sucesso',
    data: usuario
});

}

/////////////////////////////////////////////////////////
