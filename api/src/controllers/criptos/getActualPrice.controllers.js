import Cripto from "../../models/Cripto.js";
const apiKeyCoinM = "6b555911-d0f2-417f-9bd1-95cf5ea375aa";
import fetch from "node-fetch";

export const getActualPriceFunc = async (ticker) => {
    try {
        let price = 0;
        await fetch(
            `https://www.binance.us/api/v3/ticker/price?symbol=${ticker.toUpperCase()}`,
        )
            .then((responseApi) => responseApi.json())
            .then((responseApi) => (price = responseApi.price))
            .catch((err) => (price = err));
        return price;
    } catch (error) {
        return { message: error };
    }
};

export const getActualPriceDB = async (req, res) => {
    const { cripto } = req.params;
    try {
        const foundCripto = await Cripto.findOne({
            where: {
                cripto: cripto.toUpperCase(),
            },
            order: [["updatePrice", "DESC"]],
        });
        res.json(foundCripto);
    } catch (error) {
        console.error(error);
        res.json({ msg: error });
    }
};
