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
    // const dateTicker = new Date();
    // const formattedDate = dateTicker.toLocaleDateString('es-ES', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric',
    // });
    let buyBoolean;
    buy == "true" ? (buyBoolean = true) : (buyBoolean = false);
    const opsToCreate = {
        // date: date,
        date: new Date(),
        ticker: ticker.toUpperCase(),
        number: Number.parseFloat(number),
        price: Number.parseFloat(price),
        total: Number.parseFloat(total),
        buy: buyBoolean,
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
            if (buyBoolean == true) {
                console.log("buy true");
                foundHolding.amount += Number.parseFloat(number);
                foundHolding.initialTotal += Number.parseFloat(total);
                foundHolding.initialPrice =
                    foundHolding.initialTotal / foundHolding.amount;
            } else {
                console.log("buy false");
                foundHolding.amount -= Number.parseFloat(number);
                foundHolding.total -= Number.parseFloat(total);
                foundHolding.price =
                    foundHolding.initialTotal / foundHolding.amount;
            }
            await foundHolding.save();
            console.log(newOperation?.dataValues);
            res.json(newOperation);
        } else {
            const newHolding = await Holding.create({
                ...holdToCreate,
            });
            const newOperation = await Operation.create({
                ...opsToCreate,
                HoldingId: newHolding.id,
            });
            console.log(newOperation?.dataValues);
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
