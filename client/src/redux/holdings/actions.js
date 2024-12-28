export const LOAD_HOLD_FROM_DB = "LOAD_HOLD_FROM_DB";
export const LOAD_USER_ID = "LOAD_USER_ID";
export const LOAD_TOTAL_INVESTED_CAPITAL = "LOAD_TOTAL_INVESTED_CAPITAL";
export const LOAD_TOTAL_ACTUAL_PRICE = "LOAD_TOTAL_ACTUAL_PRICE";
export const LOAD_TOTAL_PROFITS = "LOAD_TOTAL_PROFITS";

// function actualPrice
// apiURL = `https://www.binance.us/api/v3/ticker/price?symbol=btcusdt`;
// REACT_APP_API_URL=https://reg-op2-api.onrender.com

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/";

export function calculateTotalInvestedCapital(arrayHoldings) {
    return arrayHoldings.reduce(
        (acumulador, elemento) => acumulador + elemento.initialTotal,
        0,
    );
}

export function calculateTotalActualPrice(arrayHoldings) {
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

export function loadHoldingsFromDB(userId) {
    return async function (dispatch) {
        var holdingsToSend = [];
        var promesas = [];
        var subPromesas = [];
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
                                        }
                                    });
                                })
                                // .then(() => console.log(holdingsToSend))
                                .then(() =>
                                    dispatch({
                                        type: LOAD_HOLD_FROM_DB,
                                        payload: holdingsToSend,
                                    }),
                                )
                                .then(() =>
                                    dispatch({
                                        type: LOAD_TOTAL_INVESTED_CAPITAL,
                                        payload:
                                            calculateTotalInvestedCapital(
                                                holdingsToSend,
                                            ),
                                    }),
                                )
                                .then(() =>
                                    dispatch({
                                        type: LOAD_TOTAL_ACTUAL_PRICE,
                                        payload:
                                            calculateTotalActualPrice(
                                                holdingsToSend,
                                            ),
                                    }),
                                )
                                .then(() =>
                                    dispatch({
                                        type: LOAD_TOTAL_PROFITS,
                                        payload:
                                            calculateTotalProfits(
                                                holdingsToSend,
                                            ),
                                    }),
                                );
                        });
                })
                .catch((err) => console.error(err));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch({ type: LOAD_TOTAL_INVESTED_CAPITAL, payload: null });
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
