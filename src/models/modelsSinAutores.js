import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Autores from "./modelsAutores.js";
import Sinopse from "./modelsSinpse.js";

const SinopseAutores = sequealize.define(
    'sinopse_autores',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_sinopse: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_sinopse',
            references: {
                model: 'sinopse',
                key: 'id'
            }
        },
        id_autor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_autor',
            references: {
                model: 'autores',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

SinopseAutores.belongsTo(Autores, {
    as: 'autor',
    foreignKey: {
        name: 'id_autor',
        allowNull: false,
        field: 'id_autor'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

SinopseAutores.belongsTo(Sinopse, {
    as: 'sinopse',
    foreignKey: {
        name: 'id_sinopse',
        allowNull: false,
        field: 'id_sinopse'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


export default SinopseAutores;
