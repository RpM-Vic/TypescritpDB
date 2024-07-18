// models/Usuario.ts
import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/config2';

interface UsuarioAttributes {
    id: number;
    nombre: string;
    email: string;
    estado: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id'> {}

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
    public id!: number;
    public nombre!: string;
    public email!: string;
    public estado!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize: db,
    tableName: 'Usuarios',
    timestamps: true,
});

export default Usuario;
