import React from "react";
import HeadTableWatchList from "../components/HeadTableWatchList";
import { setWatchList, loadWatchList } from "../redux/watchlist/actions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function WatchList() {
    const watchs = useSelector((state) => state?.watchlist);
    const dispatch = useDispatch();
    return (
        <Container>
            <button onClick={() => dispatch(loadWatchList())}>
                Actualizar SET
            </button>
            <HeadTableWatchList />
            <button onClick={() => console.log(watchs)}>GET watchlist</button>
        </Container>
    );
}

const Container = styled.div`
    max-width: 100vw;
    // overflow-x: auto;
    // white-space: nowrap;
`;
