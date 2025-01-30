import React from "react";
import HeadTableWatchList from "../components/HeadTableWatchList";
import { setWatchList, loadWatchList } from "../redux/watchlist/actions";
import { useDispatch, useSelector } from "react-redux";

export default function WatchList() {
    const watchs = useSelector((state) => state?.watchlist);
    const dispatch = useDispatch();
    return (
        <div>
            <button onClick={() => dispatch(loadWatchList())}>
                Actualizar SET
            </button>
            <HeadTableWatchList />
            <button onClick={() => console.log(watchs)}>GET watchlist</button>
        </div>
    );
}
