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

export function calculateTotalProfitsPercent(arrayHoldings) {
    return arrayHoldings.reduce(
        (acumulador, elemento) => acumulador + elemento.profitsPercent,
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
        var holdingsToSend = [];
        var promesas = [];
        var subPromesas = [];
        var temporalActualTotalPortfolio = 0.0;
        var notPricePromise = [];
        var notPriceSubPromise = [];
        try {
            await fetch(`${apiUrl}holdings/${userId}`)
                .then((js) => js.json())
                .then((holdingsResDB) => {
                    if (holdingsResDB.length > 0) {
                        holdingsToSend = [...holdingsResDB];
                        holdingsToSend.forEach((hold) => {
                            promesas.push(
                                fetch(`${apiUrl}dayprice/${hold.ticker}`),
                            );
                        });
                    }
                })
                .then(() => {
                    Promise.all(promesas)
                        .then((values) =>
                            values.forEach((v) => subPromesas.push(v.json())),
                        )
                        .then(() => {
                            Promise.all(subPromesas)
                                .then((subValues) => {
                                    // console.log(subValues);
                                    subValues.forEach((sub, i) => {
                                        if (sub) {
                                            holdingsToSend[i].actualPrice =
                                                sub.price;
                                            holdingsToSend[i].profits =
                                                holdingsToSend[i].actualPrice *
                                                    holdingsToSend[i].amount -
                                                holdingsToSend[i].initialPrice *
                                                    holdingsToSend[i].amount;
                                            holdingsToSend[i].profitsPercent =
                                                (holdingsToSend[i].profits *
                                                    100) /
                                                holdingsToSend[i].initialTotal;
                                        } else {
                                            // console.log(holdingsToSend[i]);
                                            notPricePromise.push(
                                                fetch(
                                                    `${apiUrl}daypricecmc/${holdingsToSend[i].ticker}`,
                                                ),
                                            );
                                        }
                                    });
                                })
                                // .then(() => console.log(holdingsToSend))
                                .then(() => {
                                    Promise.all(notPricePromise)
                                        .then((values) => {
                                            values.forEach((v) =>
                                                notPriceSubPromise.push(
                                                    v.json(),
                                                ),
                                            );
                                        })
                                        .then(() => {
                                            Promise.all(notPriceSubPromise)
                                                .then((toCompare) => {
                                                    let holdFound;
                                                    toCompare.forEach((to) => {
                                                        // console.log(holdingsToSend);
                                                        holdFound =
                                                            holdingsToSend.find(
                                                                (hold) =>
                                                                    hold.ticker ==
                                                                    to.symbol,
                                                            );
                                                        holdFound.actualPrice =
                                                            to.price;
                                                        holdFound.profits =
                                                            holdFound.amount *
                                                                holdFound.actualPrice -
                                                            holdFound.initialTotal;
                                                        holdFound.profitsPercent =
                                                            (holdFound.profits *
                                                                100) /
                                                            holdFound.initialTotal;
                                                    });
                                                    // console.log(notPriceSubPromise);
                                                    // console.log(toCompare);
                                                })
                                                .then(() => {
                                                    // console.log(holdingsToSend);
                                                    dispatch({
                                                        type: LOAD_INITIAL_TOTAL_PORTFOLIO,
                                                        payload:
                                                            calculateInitialTotalPortfolio(
                                                                holdingsToSend,
                                                            ),
                                                    });
                                                    temporalActualTotalPortfolio =
                                                        calculateActualTotalPortfolio(
                                                            holdingsToSend,
                                                        );
                                                    dispatch({
                                                        type: LOAD_ACTUAL_TOTAL_PORTFOLIO,
                                                        payload:
                                                            temporalActualTotalPortfolio,
                                                        // calculateActualTotalPortfolio(
                                                        //     holdingsToSend,
                                                        // ),
                                                    });
                                                    holdingsToSend = [
                                                        ...addPortfolioPercent(
                                                            holdingsToSend,
                                                            temporalActualTotalPortfolio,
                                                        ),
                                                    ];
                                                    // console.log(holdingsToSend);
                                                    dispatch({
                                                        type: LOAD_TOTAL_PROFITS,
                                                        payload:
                                                            calculateTotalProfits(
                                                                holdingsToSend,
                                                            ),
                                                    });
                                                    dispatch({
                                                        type: LOAD_TOTAL_PROFITS_PERCENT,
                                                        payload:
                                                            calculateTotalProfitsPercent(
                                                                holdingsToSend,
                                                            ),
                                                    });
                                                    dispatch({
                                                        type: LOAD_HOLD_FROM_DB,
                                                        payload: holdingsToSend,
                                                    });
                                                    //
                                                });
                                        });
                                });
                            // .then(() =>
                            //     dispatch({
                            //         type: LOAD_INITIAL_TOTAL_PORTFOLIO,
                            //         payload:
                            //             calculateInitialTotalPortfolio(
                            //                 holdingsToSend,
                            //             ),
                            //     }),
                            // )
                            // .then(() => {
                            //     temporalActualTotalPortfolio =
                            //         calculateActualTotalPortfolio(
                            //             holdingsToSend,
                            //         );
                            //     dispatch({
                            //         type: LOAD_ACTUAL_TOTAL_PORTFOLIO,
                            //         payload: temporalActualTotalPortfolio,
                            //     });
                            // })
                            // .then(() => {
                            //     holdingsToSend = [
                            //         ...addPortfolioPercent(
                            //             holdingsToSend,
                            //             temporalActualTotalPortfolio,
                            //         ),
                            //     ];
                            // })
                            // .then(() =>
                            //     dispatch({
                            //         type: LOAD_TOTAL_PROFITS,
                            //         payload:
                            //             calculateTotalProfits(
                            //                 holdingsToSend,
                            //             ),
                            //     }),
                            // )
                            // .then(() =>
                            //     dispatch({
                            //         type: LOAD_TOTAL_PROFITS_PERCENT,
                            //         payload:
                            //             calculateTotalProfitsPercent(
                            //                 holdingsToSend,
                            //             ),
                            //     }),
                            // )
                            // .then(() =>
                            //     dispatch({
                            //         type: LOAD_HOLD_FROM_DB,
                            //         payload: holdingsToSend,
                            //     }),
                            // );
                        });
                })
                .catch((err) => console.error(err))
                .finally(() => {});
            // .then(() =>
            //     dispatch({
            //         type: LOAD_INITIAL_TOTAL_PORTFOLIO,
            //         payload: calculateInitialTotalPortfolio(holdingsToSend),
            //     }),
            // )
            // .then(() => {
            //     temporalActualTotalPortfolio =
            //         calculateActualTotalPortfolio(holdingsToSend);
            //     dispatch({
            //         type: LOAD_ACTUAL_TOTAL_PORTFOLIO,
            //         payload: temporalActualTotalPortfolio,
            //     });
            // })
            // .then(() => {
            //     holdingsToSend = [
            //         ...addPortfolioPercent(
            //             holdingsToSend,
            //             temporalActualTotalPortfolio,
            //         ),
            //     ];
            // })
            // .then(() =>
            //     dispatch({
            //         type: LOAD_TOTAL_PROFITS,
            //         payload: calculateTotalProfits(holdingsToSend),
            //     }),
            // )
            // .then(() =>
            //     dispatch({
            //         type: LOAD_TOTAL_PROFITS_PERCENT,
            //         payload: calculateTotalProfitsPercent(holdingsToSend),
            //     }),
            // )
            // .then(() =>
            //     dispatch({
            //         type: LOAD_HOLD_FROM_DB,
            //         payload: holdingsToSend,
            //     }),
            // );
        } catch (error) {
            console.error(error);
        } finally {
            dispatch({ type: LOAD_INITIAL_TOTAL_PORTFOLIO, payload: null });
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
            mode: "cors", // Modo CORS
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
