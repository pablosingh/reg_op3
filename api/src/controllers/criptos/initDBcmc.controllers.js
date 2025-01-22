import Cripto from "../../models/Cripto.js";
import { getActualPriceCMCfunction } from "./getActualPrice.controllers.js";

// ====================================================
export const initialCriptoLoadingCMCtwo = async () => {
    console.log("Carga inicial de DB desde API CoinMarketCap 2");
    let arrayCripto = [];
    let arrayCriptoDB = [];
    let daysPassed = 0;
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    const headers = {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": "6b555911-d0f2-417f-9bd1-95cf5ea375aa",
    };
    const options = {
        method: "GET",
        headers: headers,
    };
    try {
        arrayCriptoDB = await Cripto.findAll({
            order: [["updatePrice", "ASC"]],
        });
        if (arrayCriptoDB.length > 0) {
            const today = new Date();
            const priceDate = new Date(arrayCriptoDB[0].updatePrice);
            const differenceDayMs = today - priceDate;
            daysPassed = Math.floor(differenceDayMs / (1000 * 60 * 60 * 24));
            console.log(daysPassed);
        }
        if (daysPassed >= 1) {
            const arrayToCreateCMC = await fetch(url, options)
                .then((js) => js.json())
                .then((arrayRes) => {
                    arrayRes.data.map((element) => {
                        arrayCripto.push({
                            cripto: element.symbol,
                            price: element.quote.USD.price,
                        });
                    });
                    return arrayCripto;
                });
            if (arrayCriptoDB.length > 0) {
                arrayCriptoDB.forEach(async (criptoDB) => {
                    const foundElement = arrayToCreateCMC.find(
                        (criptoCMC) => criptoCMC.cripto == criptoDB.cripto,
                    );
                    if (foundElement) {
                        criptoDB.price = foundElement.price;
                        criptoDB.updatePrice = new Date();
                        await criptoDB.save();
                    } else {
                        console.log("Sin precio = " + criptoDB.cripto);
                        const criptoNoPrice = await getActualPriceCMCfunction(
                            criptoDB.cripto,
                        );
                        if (criptoNoPrice) {
                            criptoDB.price = criptoNoPrice.price;
                            criptoDB.updatePrice = new Date();
                            await criptoDB.save();
                        }
                    }
                });
            } else {
                arrayToCreateCMC.forEach(async (toCreateCMC) => {
                    const createdCripto = await Cripto.create({
                        cripto: toCreateCMC.cripto.toUpperCase(),
                        price: toCreateCMC.price,
                        updatePrice: new Date(),
                    });
                    console.log(createdCripto);
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
    return arrayCripto;
};

// ====================================

export const ejecutarFuncionDiaria = () => {
    initialCriptoLoadingCMCtwo();
    programarEjecucionDiaria();
};

export const programarEjecucionDiaria = () => {
    const ahora = new Date();
    const proximaEjecucion = new Date();

    // Establecer la próxima ejecución a las 12:00 AM del siguiente día
    proximaEjecucion.setHours(24, 0, 0, 0);
    const tiempoRestante = proximaEjecucion - ahora;
    setTimeout(ejecutarFuncionDiaria, tiempoRestante);
};
