import Operation from "../../models/Operation.js";
// import User from "../../models/User.js";
import Holding from "../../models/Holding.js";
// import { updateHolding } from "../holdings/holdings.controllers.js";

export const createOperation = async (req, res) => {
    const {
        date,
        ticker,
        number,
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
    const opsToCreate = {
        // date: date,
        date: new Date(),
        ticker: ticker.toUpperCase(),
        number: Number.parseFloat(number),
        price: Number.parseFloat(price),
        total: Number.parseFloat(total),
        buy,
        exchange,
        comment,
    };
    const holdToCreate = {
        // date: date,
        date: new Date(),
        ticker: ticker.toUpperCase(),
        amount: Number.parseFloat(number),
        initialPrice: Number.parseFloat(price),
        initialTotal: Number.parseFloat(total),
        UserId,
    };
    console.log("toCreate");
    // console.log(toCreate);
    try {
        const foundHolding = await Holding.findOne({
            where: {
                ticker: ticker.toUpperCase(),
                UserId,
            },
        });
        if (foundHolding) {
            const newOperation = await Operation.create({
                ...opsToCreate,
                HoldingId: foundHolding.id,
            });
            if (buy == true) {
                foundHolding.amount += number;
                foundHolding.initialTotal += total;
                foundHolding.initialPrice =
                    foundHolding.initialTotal / foundHolding.amount;
            } else {
                foundHolding.amount -= number;
                foundHolding.total -= total;
                foundHolding.price =
                    foundHolding.initialTotal / foundHolding.amount;
            }
            await foundHolding.save();
            console.log(newOperation);
            res.json(newOperation);
        } else {
            const newHolding = await Holding.create({
                ...holdToCreate,
            });
            const newOperation = await Operation.create({
                ...opsToCreate,
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
