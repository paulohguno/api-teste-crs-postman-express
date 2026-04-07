import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Temporada from "./modelsTemporada.js"

const Episodios = sequealize.define(
    'historico',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo : {
        type: DataTypes.STRING,
        allowNull: true
    }
    
},
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)

Episodios.belongsTo(temporada, {
    as: 'perfil_usuario',
    foreignKey: {
        name: 'id_temporada',
        allowNull: false,
        field: 'Id_temporada'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});


export default Episodios