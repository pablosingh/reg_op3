import {
    LOAD_HOLD_FROM_DB,
    LOAD_USER_ID,
    LOAD_INITIAL_TOTAL_PORTFOLIO,
    LOAD_ACTUAL_TOTAL_PORTFOLIO,
    LOAD_TOTAL_PROFITS,
    LOAD_TOTAL_PROFITS_PERCENT,
    ORDER_BY_PROFITS_PERCENT_ASC,
    ORDER_BY_PROFITS_PERCENT_DES,
    ORDER_BY_PORTFOLIO_PERCENT_ASC,
    ORDER_BY_PORTFOLIO_PERCENT_DES,
    ORDER_BY_DATE_ASC,
    ORDER_BY_DATE_DES,
    LOAD_ACTUAL_HOLDING,
    ADD_PORTFOLIO_PERCENT,
    addPortfolioPercent,
} from "./actions";

import { order } from "./orderFunctions";

const initialState = {
    userId: 0,
    holdings: [],
    initialTotalPortfolio: 0.0,
    actualTotalPortfolio: 0.0,
    totalProfits: 0.0,
    totalProfitsPercent: 0.0,
    actualHolding: {},
};

export const holdings = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_HOLD_FROM_DB:
            return {
                ...state,
                holdings: [...action.payload],
            };
        case LOAD_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        case LOAD_INITIAL_TOTAL_PORTFOLIO:
            // console.log(action.payload);
            return {
                ...state,
                initialTotalPortfolio: action.payload,
            };
        case LOAD_ACTUAL_TOTAL_PORTFOLIO:
            return {
                ...state,
                actualTotalPortfolio: action.payload,
            };
        case LOAD_TOTAL_PROFITS:
            return {
                ...state,
                totalProfits: action.payload,
            };
        case LOAD_TOTAL_PROFITS_PERCENT:
            return {
                ...state,
                totalProfitsPercent:
                    (state.totalProfits * 100) / state.initialTotalPortfolio,
            };
        case ADD_PORTFOLIO_PERCENT:
            return {
                ...state,
                holdings: addPortfolioPercent(
                    state.holdings,
                    state.actualTotalPortfolio,
                ),
            };
        case ORDER_BY_PROFITS_PERCENT_ASC:
            return {
                ...state,
                holdings: [...order(state.holdings, "profitsPercent", "asc")],
            };
        case ORDER_BY_PROFITS_PERCENT_DES:
            return {
                ...state,
                holdings: [...order(state.holdings, "profitsPercent", "des")],
            };
        case ORDER_BY_PORTFOLIO_PERCENT_ASC:
            return {
                ...state,
                holdings: [...order(state.holdings, "portfolioPercent", "asc")],
            };
        case ORDER_BY_PORTFOLIO_PERCENT_DES:
            return {
                ...state,
                holdings: [...order(state.holdings, "portfolioPercent", "des")],
            };
        case ORDER_BY_DATE_ASC:
            return {
                ...state,
                holdings: [...order(state.holdings, "date", "asc")],
            };
        case ORDER_BY_DATE_DES:
            return {
                ...state,
                holdings: [...order(state.holdings, "date", "des")],
            };
        case LOAD_ACTUAL_HOLDING:
            // console.log(action.payload);
            // console.log(state.holdings);
            // let aux = state.holdings.find((hold) => {
            //     console.log(hold);
            //     return hold.ticker === action.payload.toUpperCase();
            // });
            // console.log(aux);
            return {
                ...state,
                // actualHolding: aux,
                actualHolding: state.holdings.find(
                    (hold) => hold.ticker == action.payload.toUpperCase(),
                ),
            };
        default:
            return state;
    }
};

export default holdings;
