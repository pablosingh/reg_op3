import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CardHoldingTable from "./CardHoldingTable";
import { ItemHoldingColor, secondaryColor } from "../styles/colors";

export default function HeadTableHolding() {
    const arrayHoldings = useSelector((state) => state?.holdings.holdings);
    return (
        <TableContainer>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Ticker</th>
                    <th>Cantidad</th>
                    <th>Precio Inicial</th>
                    <th>Precio Final</th>
                    <th>Capital Inicial</th>
                    <th>Capital Final</th>
                    <th>$ Ganacias</th>
                    <th>% Ganancias</th>
                    <th>% Portafolio</th>
                </tr>
            </thead>
            <tbody>
                {arrayHoldings &&
                    arrayHoldings?.map((hold) => (
                        <CardHoldingTable ticker={hold} key={hold.id} />
                    ))}
            </tbody>
        </TableContainer>
    );
}

const TableContainer = styled.table`
    // width: 100%;
    text-align: center;
    border-collapse: collapse;
    th,
    td {
        padding: 0.2em 0.4em;
        border: 1px solid black;
    }
    tbody tr:nth-child(odd) {
        background-color: ${ItemHoldingColor};
    }
    // tbody tr:nth-child(even) {
    //     background-color: rgb(73, 190, 229);
    // }
    thead tr {
        background-color: ${secondaryColor};
    }
`;
