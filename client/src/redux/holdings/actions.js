export const LOAD_HOLD_FROM_DB = "LOAD_HOLD_FROM_DB";
export const LOAD_USER_ID = "LOAD_USER_ID";
export const LOAD_INITIAL_TOTAL_PORTFOLIO = "LOAD_INITIAL_TOTAL_PORTFOLIO";
export const LOAD_ACTUAL_TOTAL_PORTFOLIO = "LOAD_ACTUAL_TOTAL_PORTFOLIO";
export const LOAD_TOTAL_PROFITS = "LOAD_TOTAL_PROFITS";
export const LOAD_TOTAL_PROFITS_PERCENT = "LOAD_TOTAL_PROFITS_PERCENT";
export const ORDER_BY_PROFITS_PERCENT_ASC = "ORDER_BY_PROFITS_PERCENT_ASC";
export const ORDER_BY_PROFITS_PERCENT_DES = "ORDER_BY_PROFITS_PERCENT_DES";
export const ORDER_BY_PORTFOLIO_PERCENT_ASC = "ORDER_BY_PORTFOLIO_PERCENT_ASC";
export const ORDER_BY_PORTFOLIO_PERCENT_DES = "ORDER_BY_PORTFOLIO_PERCENT_DES";
export const ORDER_BY_DATE_ASC = "ORDER_BY_DATE_ASC";
export const ORDER_BY_DATE_DES = "ORDER_BY_DATE_DES";
export const LOAD_ACTUAL_HOLDING = "LOAD_ACTUAL_HOLDING";

// function actualPrice
// apiURL = `https://www.binance.us/api/v3/ticker/price?symbol=btcusdt`;
// REACT_APP_API_URL=https://reg-op2-api.onrender.com

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/";

export function calculateInitialTotalPortfolio(arrayHoldings) {
    return arrayHoldings.reduce(
        (acumulador, elemento) => acumulador + elemento.initialTotal,
        0,
    );
}

export function calculateActualTotalPortfolio(arrayHoldings) {
    return arrayHoldings.reduce(
        (acumulador, elemento) =>
            acumulador + elemento.actualPrice * elemento.amount,
        0,
    );
}

export function calculateTotalProfits(arrayHoldings) {
    return arrayHoldings.reduce(
        (acumulador, elemento) => acumulador + elemento.profits,
        0,
    );
}

export function addPortfolioPercent(
    arrayHoldings,
    temporalActualTotalPortfolio,
) {
    return arrayHoldings.map((e) => {
        e.portfolioPercent =
            (e.amount * e.actualPrice * 100) / temporalActualTotalPortfolio;
        return e;
    });
}

export function loadHoldingsFromDB(userId) {
    return async function (dispatch) {
        let holdingsToSend = [];
        let temporalActualTotalPortfolio = 0.0;
        let notPricePromises = [];
        let dayPricePromises = [];
        try {
            holdingsToSend = await fetch(`${apiUrl}holdings/${userId}`).then(
                (js) => js.json(),
            );
            if (holdingsToSend.length) {
                dayPricePromises = holdingsToSend.map((hold) =>
                    fetch(`${apiUrl}dayprice/${hold.ticker}`).then((res) =>
                        res.json(),
                    ),
                );
            }
            const dayPrices = await Promise.all(dayPricePromises);
            console.log(dayPrices);
            dayPrices.forEach((sub, i) => {
                if (sub) {
                    // console.log(sub);
                    holdingsToSend[i].actualPrice = sub.price;
                    holdingsToSend[i].profits =
                        holdingsToSend[i].actualPrice *
                            holdingsToSend[i].amount -
                        holdingsToSend[i].initialPrice *
                            holdingsToSend[i].amount;
                    holdingsToSend[i].profitsPercent =
                        (holdingsToSend[i].profits * 100) /
                        holdingsToSend[i].initialTotal;
                } else {
                    notPricePromises.push(
                        fetch(
                            `${apiUrl}daypricecmc/${holdingsToSend[i].ticker}`,
                        ).then((res) => res.json()),
                    );
                }
            });
            const notPrices = await Promise.all(notPricePromises);
            notPrices.forEach((notPrice, index) => {
                console.log(
                    `Respuesta de notPricePromises[${index}]:`,
                    notPrice,
                );
                // console.log(notPrice);
                console.log(
                    "Agregando una cripto que faltaba en BD: " +
                        notPrice.symbol,
                );
                fetch(`${apiUrl}addmissingcripto`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cripto: `${notPrice.symbol}`,
                    }),
                })
                    .then((res) => res.json())
                    .catch((e) => console.log(e));
                const holdFound = holdingsToSend.find(
                    (hold) => hold.ticker == notPrice.symbol,
                );
                if (holdFound) {
                    holdFound.actualPrice = notPrice.price;
                    holdFound.profits =
                        holdFound.amount * holdFound.actualPrice -
                        holdFound.initialTotal;
                    holdFound.profitsPercent =
                        (holdFound.profits * 100) / holdFound.initialTotal;
                }
            });
            dispatch({
                type: LOAD_INITIAL_TOTAL_PORTFOLIO,
                payload: calculateInitialTotalPortfolio(holdingsToSend),
            });
            temporalActualTotalPortfolio =
                calculateActualTotalPortfolio(holdingsToSend);
            dispatch({
                type: LOAD_ACTUAL_TOTAL_PORTFOLIO,
                payload: temporalActualTotalPortfolio,
            });
            holdingsToSend = [
                ...addPortfolioPercent(
                    holdingsToSend,
                    temporalActualTotalPortfolio,
                ),
            ];
            dispatch({
                type: LOAD_TOTAL_PROFITS,
                payload: calculateTotalProfits(holdingsToSend),
            });
            dispatch({
                type: LOAD_TOTAL_PROFITS_PERCENT,
                payload: null,
            });
            dispatch({
                type: LOAD_HOLD_FROM_DB,
                payload: holdingsToSend,
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export function loadUserId({ email, name }) {
    return async function (dispatch) {
        const options = {
            method: "POST",
            body: JSON.stringify({
                email,
                name,
            }),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            await fetch(`${apiUrl}userbyemail`, options)
                .then((js) => js.json())
                .then((usr) => {
                    dispatch({ type: LOAD_USER_ID, payload: usr.id });
                    // console.log(usr);
                    return usr.id;
                })
                .then((id) => dispatch(loadHoldingsFromDB(id)))
                .catch((e) => console.error(e));
        } catch (error) {
            console.error(error);
        }
    };
}

export function initAllDispatch() {}
