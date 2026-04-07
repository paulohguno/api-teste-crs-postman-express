import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Temporada from "./modelsTemporada.js";
import Genero from "./modelsGenero.js";


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
        name: 'id_Temporada',
        allowNull: false,
        field: 'Id_Temporada'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Sinopse.belongsTo(Genero, {
    as: 'genero',
    foreignKey: {
        name: 'id_Genero',
        allowNull: false,
        field: 'Id_Genero'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});


export default Sinopse