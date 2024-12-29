import {
    LOAD_HOLD_FROM_DB,
    LOAD_USER_ID,
    LOAD_INITIAL_TOTAL_PORTFOLIO,
    LOAD_ACTUAL_TOTAL_PORTFOLIO,
    LOAD_TOTAL_PROFITS,
} from "./actions";

const initialState = {
    userId: 0,
    holdings: [],
    initialTotalPortfolio: 0.0,
    actualTotalPortfolio: 0.0,
    totalProfits: 0.0,
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
        default:
            return state;
    }
};

export default holdings;
