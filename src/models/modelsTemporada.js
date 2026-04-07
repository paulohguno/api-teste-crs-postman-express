import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Temporada = sequealize.define(
    'temporada',
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

const series = sequealize.models.Series;
const episodios = sequealize.models.Episodios;

if (series) {
    Temporada.belongsTo(series, {
        as: 'id_series',
        foreignKey: {
            name: 'id_series',
            allowNull: false,
            field: 'Id_series'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });
}

if (episodios) {
    Temporada.belongsTo(episodios, {
        as: 'id_ep',
        foreignKey: {
            name: 'id_ep',
            allowNull: false,
            field: 'Id_ep'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });
}


export default Temporada