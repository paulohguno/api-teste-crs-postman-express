import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Dados_Usuarios = sequealize.define(
    'dados_usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cpf:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        status_da_conta: {
            type: DataTypes.BOOLEAN,
            autoIncrement: false
        },
        data_pagamento:{
            type: DataTypes.DATE,
            allowNull : false
        },
        localizacao : {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName : true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt : 'updated_at'
    }
)

export default Dados_Usuarios