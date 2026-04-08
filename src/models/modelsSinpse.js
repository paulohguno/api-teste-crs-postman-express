import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Temporada from "./modelsTemporada.js";
import Genero from "./modelsGenero.js";
import Autores from "./modelsAutores.js";


const Sinopse = sequealize.define(
    'sinopse',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    data_lancamento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    informacoes: {
        type: DataTypes.STRING,
    }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)

Sinopse.belongsTo(Temporada, {
    as: 'temporada',
    foreignKey: {
        name: 'id_temporada',
        allowNull: false,
        field: 'id_temporada'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Sinopse.belongsTo(Autores, {
    as: 'autor',
    foreignKey: {
        name: 'id_autores',
        allowNull: false,
        field: 'id_autores'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Sinopse.belongsTo(Genero, {
    as: 'genero',
    foreignKey: {
        name: 'id_genero',
        allowNull: false,
        field: 'id_genero'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});


export default Sinopse