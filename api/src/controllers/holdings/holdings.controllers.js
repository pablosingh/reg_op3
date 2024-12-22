import Holding from "../../models/Holding.js";
import User from "../../models/User.js";
import Operation from "../../models/Operation.js";
import Task from "../../models/Task.js";

export const getHoldingsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const foundHoldings = await Holding.findAll({
            where: {
                UserId: userId,
            },
            include: [Operation, User, Task],
        });
        res.json(foundHoldings);
    } catch (error) {
        res.json({ msg: error });
    }
};

export const getHoldings = async (req, res) => {
    try {
        const foundHoldings = await Holding.findAll({
            include: [Operation, User, Task],
        });
        res.json(foundHoldings);
    } catch (error) {
        res.json({ msg: error });
    }
};

export const createHolding = async (req, res) => {
    const { date, ticker, amount, initialPrice, initialTotal, UserId } =
        req.body;
    const toCreate = {
        date: date,
        ticker: ticker?.toUpperCase(),
        amount: Number.parseFloat(amount),
        initialPrice: Number.parseFloat(initialPrice),
        initialTotal: Number.parseFloat(initialTotal),
        UserId,
    };
    try {
        const newHolding = await Holding.create(toCreate);
        res.json(newHolding);
    } catch (error) {
        res.json({ msg: error });
    }
};

export const updateHolding = async (id) => {
    try {
        const foundHolding = await Holding.findOne({
            where: {
                id,
            },
            include: [Operation],
        });
        if (foundHolding) {
            console.log(foundHolding);
            const objToUpdate = foundHolding.Operations?.reduce(
                (acumulador, op) => {
                    if (op.buy == true) {
                        acumulador.amount += op.amount;
                        acumulador.initialTotal += op.initialTotal;
                    } else {
                        acumulador.amount -= op.amount;
                        acumulador.initialTotal -= op.initialTotal;
                    }
                    return acumulador;
                },
                { amount: 0, initialTotal: 0 },
            );
            objToUpdate.initialPrice =
                objToUpdate.initialTotal / objToUpdate.amount;
            foundHolding.amount = objToUpdate.amount;
            foundHolding.initialTotal = objToUpdate.initialTotal;
            foundHolding.initialPrice = objToUpdate.initialPrice;
            await foundHolding.save();
            return foundHolding;
        } else {
            return { msg: "Holding not found" };
        }
    } catch (error) {
        return { msg: error };
    }
};
