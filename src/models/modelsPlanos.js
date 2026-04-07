import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Planos = sequealize.define(
    'Planos',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nivel_plano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade_telas: {
        type: DataTypes.INTEGER,
        
    },
    valor_plano: {
        type: DataTypes.FLOAT
    },
    Plano_ativo: {
        type: DataTypes.BOOLEAN,
        allowNull : false,
        autoIncrement : false
    }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default Planos