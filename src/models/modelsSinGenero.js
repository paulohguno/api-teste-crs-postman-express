import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Sinopse from "./modelsSinpse.js";


const SinGenero = sequealize.define(
    'historico',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)


SinGenero.belongsTo(Genero, {
    as: 'id_Genero',
    foreignKey: {
        name: 'id_Genero',
        allowNull: false,
        field: 'Id_Genero'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

SinGenero.belongsTo(Sinopse, {
    as: 'id_sin',
    foreignKey: {
        name: 'id_Sin',
        allowNull: false,
        field: 'Id_Sin'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});



export default SinGenero