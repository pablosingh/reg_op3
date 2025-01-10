import Cripto from "../../models/Cripto.js";
const apiKeyCoinM = "6b555911-d0f2-417f-9bd1-95cf5ea375aa";
import fetch from "node-fetch";
const headers = {
    "Content-Type": "application/json",
    "X-CMC_PRO_API_KEY": "6b555911-d0f2-417f-9bd1-95cf5ea375aa",
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
    try {
        await fetch(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cripto.toUpperCase()}`,
            {
                method: "GET",
                headers: headers,
            },
        )
            .then((responseApi) => responseApi.json())
            .then((response) => {
                // console.log("CMC");
                // console.log(response);
                let toSend = {};
                for (const key in response.data) {
                    toSend.symbol = response.data[key].symbol;
                    toSend.cripto = response.data[key].name;
                    toSend.price = response.data[key].quote.USD.price;
                    break;
                }
                console.log("toSend");
                console.log(toSend);
                return toSend;
            });
    } catch (error) {
        return { message: error };
    }
};

export const getActualPriceCMC = async (req, res) => {
    const { cripto } = req.params;
    const response = await getActualPriceCMCfunction(cripto);
    res.json(response);
};
