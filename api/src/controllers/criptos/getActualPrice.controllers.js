import Cripto from "../../models/Cripto.js";
const API_KEY_CMC = process.env.API_KEY_CMC;
import fetch from "node-fetch";
const headers = {
    "Content-Type": "application/json",
    "X-CMC_PRO_API_KEY": API_KEY_CMC,
};

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

export const getActualPriceCMCfunction = async (cripto) => {
    // const { cripto } = req.params;
    // console.log(cripto);
    let toSend = {};
    try {
        toSend = await fetch(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cripto.toUpperCase()}`,
            {
                method: "GET",
                headers: headers,
            },
        )
            .then((responseApi) => responseApi.json())
            .then((response) => {
                // console.log(response);
                for (const key in response.data) {
                    toSend.cripto = cripto.toUpperCase();
                    toSend.price = response.data[key].quote.USD.price;
                    break;
                }
                return toSend;
            });
        return toSend;
    } catch (error) {
        return { message: error };
    }
};

export const getActualPriceCMC = async (req, res) => {
    const { cripto } = req.params;
    const response = await getActualPriceCMCfunction(cripto);
    if (!response) {
        console.log("Cripto CMC Fallo");
        console.log(response);
    } else {
        console.log(response);
    }
    res.json(response);
};

export const getActualPriceDBfunction = async (cripto) => {
    try {
        const foundCripto = await Cripto.findOne({
            where: {
                cripto: cripto.toUpperCase(),
            },
            order: [["updatePrice", "DESC"]],
        });
        if (foundCripto) {
            return {
                cripto,
                price: foundCripto.price,
            };
        } else {
            return {
                cripto,
                price: null,
            };
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
