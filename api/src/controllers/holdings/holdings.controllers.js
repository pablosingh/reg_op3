import Holding from "../../models/Holding.js";
import User from "../../models/User.js";
import Operation from "../../models/Operation.js";
import Task from "../../models/Task.js";
import Cripto from "../../models/Cripto.js";
import {
    getActualPriceCMCfunction,
    getActualPriceDBfunction,
} from "../criptos/getActualPrice.controllers.js";

export const getAllHoldings = async (req, res) => {
    try {
        const foundHoldings = await Holding.findAll({
            include: [Operation, User, Task],
        });
        res.json(foundHoldings);
    } catch (error) {
        res.json({ msg: error });
    }
};

// export const updateHolding = async (id) => {
//     try {
//         const foundHolding = await Holding.findOne({
//             where: {
//                 id,
//             },
//             include: [Operation],
//         });
//         if (foundHolding) {
//             console.log(foundHolding);
//             const objToUpdate = foundHolding.Operations?.reduce(
//                 (acumulador, op) => {
//                     if (op.buy == true) {
//                         acumulador.amount += Number.parseFloat(op.amount);
//                         acumulador.initialTotal += Number.parseFloat(
//                             op.initialTotal,
//                         );
//                     } else {
//                         acumulador.amount -= Number.parseFloat(op.amount);
//                         acumulador.initialTotal -= Number.parseFloat(
//                             op.initialTotal,
//                         );
//                     }
//                     return acumulador;
//                 },
//                 { amount: 0.0, initialTotal: 0.0 },
//             );
//             objToUpdate.initialPrice =
//                 objToUpdate.initialTotal / objToUpdate.amount;
//             foundHolding.amount = objToUpdate.amount;
//             foundHolding.initialTotal = objToUpdate.initialTotal;
//             foundHolding.initialPrice = objToUpdate.initialPrice;
//             await foundHolding.save();
//             return foundHolding;
//         } else {
//             return { msg: "Holding not found" };
//         }
//     } catch (error) {
//         return { msg: error };
//     }
// };

export const getHoldingsByUserIdWithActualPrices = async (req, res) => {
    const { userId } = req.params;
    console.log("Cargando Holdings con Precios actuales");
    let dayPricePromises = [];
    try {
        const allHoldings = await Holding.findAll({
            where: {
                UserId: userId,
            },
            include: [Operation, User, Task],
        });

        allHoldings.forEach((hold) =>
            dayPricePromises.push(getActualPriceDBfunction(hold.ticker)),
        );

        const dayPriceDB = await Promise.all(dayPricePromises);
        const dayPriceDBandCMCPromises = dayPriceDB.map(async (dayp) => {
            if (dayp.price) return dayp;
            else {
                let newCripto;
                const notPriceDBaux = await getActualPriceCMCfunction(
                    dayp.cripto,
                );
                if (notPriceDBaux.price) {
                    console.log("==========Creando: " + notPriceDBaux.cripto);
                    newCripto = await Cripto.create({
                        cripto: dayp.cripto.toUpperCase(),
                        price: notPriceDBaux.price,
                        updatePrice: new Date(),
                    });
                    return {
                        cripto: newCripto.cripto,
                        price: newCripto.price,
                    };
                } else {
                    return notPriceDBaux;
                }
            }
        });
        const dayPriceAll = await Promise.all(dayPriceDBandCMCPromises);
        // console.log("==============================dayPriceAll");
        // console.log(dayPriceAll);

        const allHoldingsToSend = allHoldings.map((hold) => {
            let holdToSend = {};
            const dayPriceFound = dayPriceAll.find(
                (dayp) => dayp.cripto == hold.ticker,
            );
            holdToSend.id = hold.id;
            holdToSend.date = hold.date;
            holdToSend.ticker = hold.ticker;
            holdToSend.amount = hold.amount;
            holdToSend.initialPrice = hold.initialPrice;
            holdToSend.initialTotal = hold.initialTotal;
            holdToSend.UserId = hold.UserId;
            holdToSend.Operations = [...hold.Operations];
            holdToSend.User = {
                id: hold.User.id,
                name: hold.User.name,
                email: hold.User.email,
            };
            holdToSend.Tasks = [...hold.Tasks];
            // ========================================
            holdToSend.actualPrice = dayPriceFound.price;
            holdToSend.actualTotal = holdToSend.actualPrice * holdToSend.amount;
            holdToSend.profits =
                holdToSend.actualTotal - holdToSend.initialTotal;
            holdToSend.profitsPercent =
                (holdToSend.profits * 100) / holdToSend.initialTotal;
            return holdToSend;
        });
        // console.log("==============================allHoldingsToSend");
        // console.log(allHoldingsToSend);

        res.json(allHoldingsToSend);
    } catch (error) {
        res.json({ msg: error });
    }
};
