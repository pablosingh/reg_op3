import React, { useState } from "react";
import styled from "styled-components";

export default function CardHoldingTable(props) {
    const {
        id,
        date,
        ticker,
        //
        amount,
        initialPrice,
        initialTotal,
        //
        actualPrice,
        profits,
        profitsPercent,
        portfolioPercent,
        Operations,
    } = props.ticker;
    // const state = useSelector((state) => state);
    const [showOps, setShowOps] = useState(false);
    const dateTicker = new Date(date);
    const formattedDate = dateTicker.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const formatter = new Intl.NumberFormat("es-ES", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    });
    return (
        <TrContainer>
            <td>{formattedDate}</td>
            <td>{ticker}</td>
            <td>{amount}</td>
            <td>{formatter.format(initialPrice)}</td>
            <td>${formatter.format(actualPrice)}</td>
            {/* <td>${actualPrice}</td> */}
            <td>${formatter.format(initialTotal)}</td>
            <td>${formatter.format(amount * actualPrice)}</td>
            <td className={`${profits > 0 ? "green" : "red"}`}>
                ${formatter.format(profits)}
            </td>
            <td className={`${profitsPercent > 0 ? "green" : "red"}`}>
                % {formatter.format(profitsPercent)}
            </td>
            <td>% {formatter.format(portfolioPercent)}</td>
        </TrContainer>
    );
}

const TrContainer = styled.tr`
    .red {
        font-weight: bold;
        color: red;
    }
    .green {
        font-weight: bold;
        color: green;
    }
`;
