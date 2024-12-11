import Cripto from "../../models/Cripto.js";
import { getActualPriceFunc } from "./getActualPrice.controllers.js";

export const addCripto = async (req, res) => {
    const { cripto } = req.body;
    try {
        const newCripto = await Cripto.create({
            cripto: cripto.toUpperCase(),
            price: await getActualPriceFunc(cripto),
            updatePrice: new Date(),
        });
        res.json(newCripto);
    } catch (error) {
        res.json({ message: error });
    }
};

export const getCriptos = async (req, res) => {
    try {
        const foundCriptos = await Cripto.findAll({});
        res.json(foundCriptos);
    } catch (error) {
        res.json({ message: error });
    }
};
