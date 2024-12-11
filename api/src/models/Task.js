import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Task = sequelize.define(
    "Task",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        done: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    },
);

export default Task;
