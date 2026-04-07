import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Series = sequealize.define(
    'historico',
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numero_episodios : {
        type: DataTypes.INTEGER
    }
},
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
)

Series.belongsTo(Autores, {
    as: 'id_autores',
    foreignKey: {
        name: 'id_autores',
        allowNull: false,
        field: 'Id_autores'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});







export default Series