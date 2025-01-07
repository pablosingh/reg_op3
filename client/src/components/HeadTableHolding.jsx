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
                    <th>
                        <div>Precio Inicial</div>
                        <div>Precio Final</div>
                    </th>
                    <th>
                        <div>Capital Inicial</div>
                        <div>Capital Final</div>
                    </th>
                    <th>
                        <div>% Ganacias</div>
                        <div>$ Ganacias</div>
                    </th>
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
        padding: 0.2em 0.4em;
        border: 1px solid black;
    }
    tbody tr:nth-child(odd) {
        background-color: ${ItemHoldingColor};
    }
    // tbody tr:nth-child(even) {
    //     background-color: rgb(73, 190, 229);
    // }
`;
