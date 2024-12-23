import {
    LOAD_HOLD_FROM_DB,
    LOAD_USER_ID,
    LOAD_TOTAL_INVESTED_CAPITAL,
    LOAD_TOTAL_ACTUAL_PRICE,
    LOAD_TOTAL_PROFITS,
} from "./actions";

const initialState = {
    userId: 0,
    holdings: [],
    totalInvestedCapital: 0.0,
    totalActualPrice: 0.0,
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
        case LOAD_TOTAL_INVESTED_CAPITAL:
            return {
                ...state,
                totalInvestedCapital: action.payload,
            };
        case LOAD_TOTAL_ACTUAL_PRICE:
            return {
                ...state,
                totalActualPrice: action.payload,
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
