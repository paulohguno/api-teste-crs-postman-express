import { Sequelize } from "..config/index.js";
import { DataTypes } from "sequelize";
import Dados_Usuarios from "./modelsUsuarios";


const Autenticacao = Sequelize.define(
    'autenticacao',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        passwordHash: {
            field: 'password_hash',
        type: DataTypes.STRING(1000)
        },
})

Autenticacao.belongsTo(Dados_Usuarios, {
    as: 'dados_usuario',
    foreignKey: {
        name: 'id_dados_usuario',
        allowNull: false,
        field: 'id_dados_usuario'
    },
    onDelete: 'NO ACTION',
})

export default Autenticacao;    