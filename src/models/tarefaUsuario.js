import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Tarefa from "./TarefaModel.js";

const TarefaUsuario = sequealize.define(
    'tarefas_usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_tarefa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_tarefa'
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

TarefaUsuario.belongsTo(Tarefa, {
    as: 'tarefa',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_tarefa',
        allowNull: false,
        field: 'id_tarefa'
    }
});

export default TarefaUsuario