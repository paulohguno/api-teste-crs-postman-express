import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Sinopse from "./modelsSinpse.js";
import Temporada from "./modelsTemporada.js";

const SinopseTemporada = sequealize.define(
    'sinopse_temporadas',
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
        id_temporada: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_temporada',
            references: {
                model: 'temporada',
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

SinopseTemporada.belongsTo(Sinopse, {
    as: 'sinopse',
    foreignKey: {
        name: 'id_sinopse',
        allowNull: false,
        field: 'id_sinopse'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

SinopseTemporada.belongsTo(Temporada, {
    as: 'temporada',
    foreignKey: {
        name: 'id_temporada',
        allowNull: false,
        field: 'id_temporada'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export default SinopseTemporada;
