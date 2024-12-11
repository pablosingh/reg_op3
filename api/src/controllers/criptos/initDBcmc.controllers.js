import Cripto from "../../models/Cripto.js";

export const initialCriptoLoadingCMC = async () => {
    console.log("Carga inicial de DB desde API CoinMarketCap");
    const arrayCripto = [];
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    const headers = {
        "Content-Type": "application/json",
        "X-CMC_PRO_API_KEY": "6b555911-d0f2-417f-9bd1-95cf5ea375aa",
    };
    try {
        await fetch(url, {
            method: "GET",
            headers: headers,
        })
            .then((js) => js.json())
            .then((arrayRes) => {
                arrayRes.data.map((element) => {
                    arrayCripto.push({
                        cripto: element.symbol,
                        price: element.quote.USD.price,
                    });
                });
                return arrayCripto;
            })
            .then((arrayToCreate) => {
                // const slicedArray = arrayToCreate.slice(1, 30);// mas corto por deploy
                arrayToCreate.map(async (toCreate) => {
                    const foundElement = await Cripto.findOne({
                        where: {
                            cripto: toCreate.cripto.toUpperCase(),
                        },
                    });
                    if (foundElement) {
                        foundElement.price = toCreate.price;
                        foundElement.updatePrice = new Date();
                        await foundElement.save();
                    } else {
                        await Cripto.create({
                            cripto: toCreate.cripto.toUpperCase(),
                            price: toCreate.price,
                            updatePrice: new Date(),
                        });
                    }
                });
            })
            .catch((e) => console.error(e));
    } catch (error) {
        console.error(error);
    }
    return arrayCripto;
};

// ====================================

export const ejecutarFuncionDiaria = () => {
    initialCriptoLoadingCMC();
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
// Iniciar la primera ejecución
// programarEjecucionDiaria();
