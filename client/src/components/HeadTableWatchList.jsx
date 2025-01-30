import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import CardHoldingTable from "./CardHoldingTable";
import { ItemHoldingColor, secondaryColor } from "../styles/colors";
import CardWatchList from "./CardWatchList";

export default function HeadTableWatchList() {
    const watchs = useSelector((state) => state?.watchlist?.watchlist);
    return (
        <TableContainer>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Ticker</th>
                    <th>Precio</th>
                    <th>% 1 hs</th>
                    <th>% 1 Dia</th>
                    <th>% 7 Dias</th>
                    <th>% 30 Dias</th>
                    <th>% 60 Dias</th>
                    <th>% 90 Dias</th>
                    <th>Market Cap</th>
                    <th>Dominancia</th>
                    <th>FDV</th>
                </tr>
            </thead>
            <tbody>
                {watchs &&
                    watchs?.map((watch, i) => (
                        <CardWatchList watch={watch} key={i} />
                    ))}
            </tbody>
        </TableContainer>
    );
}

const TableContainer = styled.table`
    // width: 100%;
    font-size: 1em;
    text-align: center;
    border-collapse: collapse;
    margin: 0.2em 1em;
    padding: 0.1em;
    thead th {
        border: 2px solid black;
        top: 0;
        position: sticky;
        background-color: ${secondaryColor};
        z-index: 1;
    }
    td {
        padding: 0.05em 0.2em;
        border: 1px solid black;
    }
    tbody tr:nth-child(odd) {
        background-color: ${ItemHoldingColor};
    }
    // tbody tr:nth-child(even) {
    //     background-color: rgb(73, 190, 229);
    // }
`;
