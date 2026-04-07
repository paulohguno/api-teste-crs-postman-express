import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import DadosUsuarios from "./dadosUsuariosModels.js";

const PerfisUsuarios = sequealize.define(
    'perfis_usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        id_dados_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_dados_usuario',
            references: {
                model: 'dados_usuarios',
                key: 'id'
            }
        },
        infantil: {
            type: DataTypes.BOOLEAN,
            autoIncrement: false
        }

    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

PerfisUsuarios.belongsTo(DadosUsuarios, {
    as: 'dados_usuario',
    foreignKey: {
        name: 'id_dados_usuario',
        allowNull: false,
        field: 'id_dados_usuario'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

DadosUsuarios.hasMany(PerfisUsuarios, {
    as: 'perfis',
    foreignKey: {
        name: 'id_dados_usuario',
        allowNull: false,
        field: 'id_dados_usuario'
    }
});

export default PerfisUsuarios