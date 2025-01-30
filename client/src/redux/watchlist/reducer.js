import { SET_WATCHLIST } from "./actions";
const initialState = {
    watchlist: [],
    updatedList: null,
};

export default function watchlist(state = initialState, action) {
    switch (action.type) {
        case SET_WATCHLIST:
            return {
                ...state,
                watchlist: [...action.payload],
            };
        default:
            return state;
    }
}
