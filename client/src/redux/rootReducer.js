import { combineReducers } from "redux";
import holdings from "./holdings/reducer";

const rootReducer = combineReducers({
    holdings,
});

export default rootReducer;
