export const SET_WATCHLIST = "SET_WATCHLIST";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/";

export function setWatchList(watch) {
    return {
        type: SET_WATCHLIST,
        payload: watch,
    };
}

export function loadWatchList() {
    return async function (dispatch) {
        try {
            const response = await fetch(`${apiUrl}watch`).then((js) =>
                js.json(),
            );
            console.log(response);
            dispatch(setWatchList(response));
        } catch (error) {
            console.error(error);
        }
    };
}
