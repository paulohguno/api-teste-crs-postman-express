import { sequealize as sequelize } from "../config/index.js";
import DadosUsuarios from "../models/modelsUsuarios.js";
import PerfisUsuarios from "../models/modelsPerfisUsuarios.js";
import Historico from "../models/modelsHistorico.js";
import Sinopse from "../models/modelsSinpse.js";

const get = async (req, res ) => {
    try{
        const dados = await DadosUsuarios.findAll();
        return res.status(200).send({
            type: 'sucess',
            message: 'usuarios listados com sucesso',
            data : dados

        })
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}


const getlancamentos = async (req, res) => {
    try {
        const { id } = req.params;
        const idUsuarioNumero = Number(id);

        if (!Number.isInteger(idUsuarioNumero) || idUsuarioNumero <= 0) {
            return res.status(400).send({
                type: 'error',
                message: 'id invalido',
                data: []
            });
        }

        const usuario = await DadosUsuarios.findByPk(idUsuarioNumero);

        if (!usuario) {
            return res.status(404).send({
                type: 'error',
                message: 'usuario nao encontrado',
                data: []
            });
        }

        const dados = await Historico.findAll({
            attributes: [
                'id_sinopse',
                [sequelize.fn('COUNT', sequelize.col('historico.id_sinopse')), 'total_assistido']
            ],
            include: [
                {
                    model: PerfisUsuarios,
                    as: 'perfil_usuario',
                    attributes: [],
                    where: { id_dados_usuario: idUsuarioNumero }
                },
                {
                    model: Sinopse,
                    as: 'Sinopse',
                    attributes: ['id', 'data_lancamento', 'informacoes']
                }
            ],
            group: ['historico.id_sinopse', 'Sinopse.id'],
            order: [
                [sequelize.literal('total_assistido'), 'DESC'],
                [{ model: Sinopse, as: 'Sinopse' }, 'data_lancamento', 'DESC']
            ],
            limit: 1
        });

        return res.status(200).send({
            type: 'sucess',
            message: 'lancamento mais assistido encontrado com sucesso',
            data: dados
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro na busca de lancamentos',
            data: error.message,
        });
    }
}


const create = async (req, res) => {
    try {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            type: 'error',
            message: 'dados sao obrigatorios',
            data: []
        })
    }

    const retorno = await DadosUsuarios.create(req.body);

    return res.status(201).send({
        type: 'sucess',
        message: 'usuario criado com sucesso',
        data: retorno
    });

    }catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}

const getcomid = async (req, res) => {
    try {
        const { id } = req.params;
        const idNumero = Number(id);

        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).send({
                type: 'error',
                message: 'id invalido',
                data: []
            });
        }

        const usuario = await DadosUsuarios.findByPk(idNumero);

        if (!usuario) {
            return res.status(404).send({
                type: 'error',
                message: 'usuario nao encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'sucess',
            message: 'usuario encontrado',
            data: usuario
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        });
    }
}

const destroy = async (req, res) => {
    try{
        const id = req.params.id ? req.params.id.replace(/\D/g, '') : null;
        const dado = await DadosUsuarios.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'usuario nao encontrado',
                data: []
            });
        }
        await dado.destroy();
        return res.status(200).send({
            type: 'sucess',
            message: 'usuario deletado com sucesso',
            data: []
        });


    }catch (error){
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}


const update = async (req, res) => {
    try{
        const id = req.params.id ? req.params.id.replace(/\D/g, '') : null;
        const requisicao = req.body;

        const dado = await DadosUsuarios.findOne({
            where: { 
                id
            }
        });

        if (!dado) {
            return res.status(404).send({
                type: 'error',
                message: 'usuario nao encontrado',
                data: []
            });
        }

        Object.keys(requisicao).forEach(campo => dado[campo] = requisicao[campo]);
        await dado.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'usuario atualizado com sucesso',
            data: dado
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'erro de servidor',
            data: error.message,
        })
    }
}

export default {
    get,
    getlancamentos,
    create,
    getcomid,
    destroy,
    update
}