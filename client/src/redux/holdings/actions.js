import temporalDBjson from "../../assets/temporalDB.json";
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

export function setDefinitions(holdingsToSend, dispatch) {
    let temporalActualTotalPortfolio = 0.0;
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
        ...addPortfolioPercent(holdingsToSend, temporalActualTotalPortfolio),
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
}

export function loadHoldingsFromDBwithActualPrice(userId) {
    return async function (dispatch) {
        let holdingsToSend = [];
        // let temporalActualTotalPortfolio = 0.0;
        try {
            // solicitamos todos los holdings a DB
            holdingsToSend = await fetch(
                `${apiUrl}holdings/all/${userId}`,
            ).then((js) => js.json());
            setDefinitions(holdingsToSend, dispatch);
        } catch (error) {
            console.error(error);
        }
    };
}

export function loadHoldingsNoBackend() {
    console.log("Sin Backend...");
    return async function (dispatch) {
        setDefinitions(temporalDBjson, dispatch);
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
                .then((id) => dispatch(loadHoldingsFromDBwithActualPrice(id)))
                .catch((e) => {
                    dispatch(loadHoldingsNoBackend());
                    console.error(e);
                });
        } catch (error) {
            console.error(error);
        }
    };
}
