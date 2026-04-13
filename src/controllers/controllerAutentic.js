import Autenticacao from "../models/modelsAutentic.js";
import bcrypt from 'bcrypt';
import { generateToken, verifyTokenUtil } from '../utils/tokenManager.js';

const getcomid = async (req, res) => {
    try {
        const { id } = req.params;

        const resposta = await Autenticacao.findOne({
            where: {
                id
            }
        });

        if (!resposta) {
            return res.status(404).send({
                type: 'error',
                message: 'nao existe'
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'deu boa',
            data: resposta,
        });

    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
        });
    }
}


const register = async (req, res) => {
    try {
        const {
            email,
            nome,
            password
        } = req.body;

        if (!email || !nome || !password) {
            throw new Error('dados faltando');
        }

        const usuarioExistente = await Autenticacao.findOne({
            where: {
                email
            }
        });

        if (usuarioExistente) {
            return res.status(400).send({
                type: 'error',
                message: 'ja existe!'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const usuario = await Autenticacao.create({
            email,
            nome,
            passwordHash
        });

        const token = generateToken({
            idUsuario: usuario.id,
            nomeUsuario: usuario.nome,
            emailUsuario: usuario.email
        });

        return res.status(201).send({
            type: 'success',
            message: 'usuario criado com sucesso',
            data: {
                usuario: usuario,
                token: token
            }
        });

    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
        });
    }
}

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        if (!email || !password) {
            throw new Error('dados faltando');
        }

        const usuarioExistente = await Autenticacao.findOne({
            where: {
                email
            }
        });

        if (!usuarioExistente || !(await bcrypt.compare(password, usuarioExistente.passwordHash))) {
            return res.status(400).send({
                type: 'error',
                message: 'email ou senha incorretos'
            });
        }

        const token = generateToken({
            idUsuario: usuarioExistente.id,
            nomeUsuario: usuarioExistente.nome,
            emailUsuario: usuarioExistente.email
        });

        return res.status(200).send({
            type: 'success',
            message: 'deu boa',
            data: token
        });


    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
        });
    }
}

const getUserByToken = (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            return res.status(400).send({
                message: 'cade o token'
            });
        }

        const resposta = verifyTokenUtil(token);

        return res.json({
            data: resposta
        })

    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
        });
    }
}


export default {
    register,
    login,
    getUserByToken
}