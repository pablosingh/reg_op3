export const getWatchListCMC = async (req, res) => {
    const urlCMC = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CMC_PRO_API_KEY": "6b555911-d0f2-417f-9bd1-95cf5ea375aa",
        },
    };
    let watchToSend = [];
    try {
        const response = await fetch(urlCMC, options).then((js) => js.json());
        console.log(response);
        for (const key in response.data) {
            watchToSend.push({
                cripto: response.data[key].symbol,
                updatedPrices: response.data[key].last_updated,
                price: response.data[key].quote.USD.price,

                percent_change_1h:
                    response.data[key].quote.USD.percent_change_1h,
                percent_change_24h:
                    response.data[key].quote.USD.percent_change_24h,
                percent_change_7d:
                    response.data[key].quote.USD.percent_change_7d,

                percent_change_30d:
                    response.data[key].quote.USD.percent_change_30d,
                percent_change_60d:
                    response.data[key].quote.USD.percent_change_60d,
                percent_change_90d:
                    response.data[key].quote.USD.percent_change_90d,

                market_cap: response.data[key].quote.USD.market_cap,
                market_cap_dominance:
                    response.data[key].quote.USD.market_cap_dominance,
                fdv: response.data[key].quote.USD.fully_diluted_market_cap,
            });
        }
        // console.log(watchToSend);
        res.json(watchToSend);
    } catch (error) {
        console.error(error);
        res.json({ msg: error });
    }
};
