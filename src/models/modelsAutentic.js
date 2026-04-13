import { sequealize } from "../config/index.js";
import { DataTypes } from "sequelize";



const Autentic = sequealize.define(
    'autenticacao',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            field: 'password_hash',
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)



export default Autentic;    