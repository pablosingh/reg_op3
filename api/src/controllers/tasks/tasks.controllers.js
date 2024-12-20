import Task from "../../models/Task.js";
import Holding from "../../models/Holding.js";

export const createTask = async (req, res) => {
    console.log(req.body);
    const { title, description, done, HoldingId } = req.body;
    try {
        const newTask = await Task.create({
            title,
            description,
            done,
            HoldingId,
        });
        res.json(newTask);
    } catch (error) {
        res.json({ message: error });
    }
};

export const updateDoneTask = async (req, res) => {
    console.log(req.body);
    const { id, done } = req.body;
    try {
        const foundTask = Task.findOne({
            where: {
                id,
            },
        });
        if (foundTask) {
            foundTask.done = done;
            await foundTask.save();
            res.json(foundTask);
        } else {
            res.json({ message: "Task not found" });
        }
    } catch (error) {
        res.json({ message: error });
    }
};

export const getTasksByHoldingId = async (req, res) => {
    const { HoldingId } = req.body;
    try {
        const arrayTasks = await Task.findAll({
            where: {
                HoldingId,
            },
            include: Holding,
        });
        res.json(arrayTasks);
    } catch (error) {
        res.json({ message: error });
    }
};
