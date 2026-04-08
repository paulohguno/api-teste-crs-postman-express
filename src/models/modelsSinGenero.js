import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";

const SinopseGenero = sequealize.define(
    'sinopse_generos',
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
        id_genero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_genero',
            references: {
                model: 'genero',
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

const sinopseModel = sequealize.models.sinopse;
const generoModel = sequealize.models.genero;

if (sinopseModel) {
    SinopseGenero.belongsTo(sinopseModel, {
        as: 'sinopse',
        foreignKey: {
            name: 'id_sinopse',
            allowNull: false,
            field: 'id_sinopse'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
}

if (generoModel) {
    SinopseGenero.belongsTo(generoModel, {
        as: 'genero',
        foreignKey: {
            name: 'id_genero',
            allowNull: false,
            field: 'id_genero'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
}

export default SinopseGenero;
