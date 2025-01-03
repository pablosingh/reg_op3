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
} from "./actions";

import { order } from "./orderFunctions";

const initialState = {
    userId: 0,
    holdings: [],
    initialTotalPortfolio: 0.0,
    actualTotalPortfolio: 0.0,
    totalProfits: 0.0,
    totalProfitsPercent: 0.0,
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
                totalProfitsPercent: action.payload,
            };
        case ORDER_BY_PROFITS_PERCENT_ASC:
            // console.log(state.holdings);
            return {
                ...state,
                holdings: [...order(state.holdings, "profitsPercent", "asc")],
            };
        case ORDER_BY_PROFITS_PERCENT_DES:
            // console.log(state.holdings);
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
        default:
            return state;
    }
};

export default holdings;
