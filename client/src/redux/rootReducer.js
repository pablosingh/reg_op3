import { combineReducers } from "redux";
import holdings from "./holdings/reducer";
import watchlist from "./watchlist/reducer";

const rootReducer = combineReducers({
    holdings,
    watchlist,
});

export default rootReducer;
