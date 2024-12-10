import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Holding = sequelize.define(
    "Holdings",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
        },
        ticker: {
            type: DataTypes.STRING,
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
        comment: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    },
);

export default Holding;
