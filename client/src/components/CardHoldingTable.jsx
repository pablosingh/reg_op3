import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        maximumFractionDigits: 2,
    });
    const smallFormatter = new Intl.NumberFormat("es-ES", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    });
    return (
        <TrContainer onClick={() => console.log("click")}>
            <td>{formattedDate}</td>
            <td className="negrita">
                <Link to={`/hold/${ticker}`} className="link">
                    {ticker}
                </Link>
            </td>
            <td>{amount}</td>
            <td>
                <div>
                    ${" "}
                    {initialPrice < 0.01
                        ? smallFormatter.format(initialPrice)
                        : formatter.format(initialPrice)}
                </div>
                <div>
                    ${" "}
                    {actualPrice < 0.01
                        ? smallFormatter.format(actualPrice)
                        : formatter.format(actualPrice)}
                </div>
            </td>
            <td>
                <div>
                    ${" "}
                    {initialTotal < 0.01
                        ? smallFormatter.format(initialTotal)
                        : formatter.format(initialTotal)}
                </div>
                <div>
                    ${" "}
                    {amount * actualPrice < 0.01
                        ? smallFormatter.format(amount * actualPrice)
                        : formatter.format(amount * actualPrice)}
                </div>
            </td>
            <td>
                <div className={`${profitsPercent > 0 ? "green" : "red"}`}>
                    %{" "}
                    {profitsPercent < 0.01 && profitsPercent > -1
                        ? smallFormatter.format(profitsPercent)
                        : formatter.format(profitsPercent)}
                </div>
                <div className={`${profits > 0 ? "green" : "red"}`}>
                    ${" "}
                    {profits < 0.01 && profits > -1
                        ? smallFormatter.format(profits)
                        : formatter.format(profits)}
                </div>
            </td>
            <td className={`${portfolioPercent > 4 ? "highPercent" : " "}`}>
                %{" "}
                {portfolioPercent < 0.01
                    ? smallFormatter.format(portfolioPercent)
                    : formatter.format(portfolioPercent)}
            </td>
        </TrContainer>
    );
}

const TrContainer = styled.tr`
    .red {
        font-weight: bold;
        // color: red;
        color: white;
        background-color: red;
    }
    .green {
        font-weight: bold;
        // color: green;
        color: white;
        background-color: green;
    }
    .negrita {
        font-weight: bold;
    }
    .link {
        text-decoration: none;
        color: black;
    }
    .highPercent {
        color: white;
        font-weight: bold;
        background-color: blue;
    }
`;
