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
        initialPrice: {
            type: DataTypes.FLOAT,
        },
        initialTotal: {
            type: DataTypes.FLOAT,
        },
    },
    {
        timestamps: false,
    },
);

export default Holding;
