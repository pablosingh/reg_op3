import Operation from "../../models/Operation.js";
// import User from "../../models/User.js";
import Holding from "../../models/Holding.js";
// import { updateHolding } from "../holdings/holdings.controllers.js";

export const createOperation = async (req, res) => {
    const {
        date,
        ticker,
        amount,
        price,
        total,
        buy,
        exchange,
        comment,
        UserId,
    } = req.body;
    // const formattedBuy = buy === "true" ? true : false;
    console.log("req body");
    console.log(req.body);
    // const dateTicker = new Date();
    // const formattedDate = dateTicker.toLocaleDateString('es-ES', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric',
    // });
    const toCreate = {
        // date: date,
        date: new Date(),
        amount: Number.parseFloat(amount),
        price: Number.parseFloat(price),
        total: Number.parseFloat(total),
        comment,
    };
    console.log("toCreate");
    console.log(toCreate);
    try {
        const foundHolding = await Holding.findOne({
            where: {
                ticker: ticker.toUpperCase(),
                UserId,
            },
        });
        if (foundHolding) {
            const newOperation = await Operation.create({
                ...toCreate,
                buy,
                exchange,
                HoldingId: foundHolding.id,
            });
            if (buy == true) {
                foundHolding.amount += toCreate.amount;
                foundHolding.total += toCreate.total;
                foundHolding.price = foundHolding.total / foundHolding.amount;
            } else {
                foundHolding.amount -= toCreate.amount;
                foundHolding.total -= toCreate.total;
                foundHolding.price = foundHolding.total / foundHolding.amount;
            }
            await foundHolding.save();
            console.log(newOperation);
            res.json(newOperation);
        } else {
            const newHolding = await Holding.create({
                ...toCreate,
                ticker: ticker.toUpperCase(),
                UserId,
            });
            const newOperation = await Operation.create({
                ...toCreate,
                buy,
                exchange,
                HoldingId: newHolding.id,
            });
            console.log(newOperation);
            res.json(newOperation);
        }
    } catch (error) {
        res.json({ message: error });
    }
};

export const getOperations = async (req, res) => {
    try {
        const arrayOp = await Operation.findAll({
            include: Holding,
        });
        res.json(arrayOp);
    } catch (error) {
        res.json({ message: error });
    }
};
