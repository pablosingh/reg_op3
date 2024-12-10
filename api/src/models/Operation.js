import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Operation = sequelize.define(
    "Operations",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
        },
        amount: {
            type: DataTypes.FLOAT,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        total: {
            type: DataTypes.FLOAT,
        },
        buy: {
            type: DataTypes.BOOLEAN,
        },
        exchange: {
            type: DataTypes.STRING,
        },
        comment: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    },
);

export default Operation;
