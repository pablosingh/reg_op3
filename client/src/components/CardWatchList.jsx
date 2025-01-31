import React, { useState } from "react";
import styled from "styled-components";

export default function CardWatchList(props) {
    const {
        updatedPrices,
        cripto,
        price,
        percent_change_1h,
        percent_change_24h,
        percent_change_7d,
        percent_change_30d,
        percent_change_60d,
        percent_change_90d,
        market_cap,
        market_cap_dominance,
        fdv,
    } = props.watch;
    const dateTicker = new Date(updatedPrices);
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
    return (
        <TrContainer>
            <td>{formattedDate}</td>
            <td>{cripto}</td>
            <td>{formatter.format(price)}</td>
            <td className={`${percent_change_1h >= 0 ? "green" : "red"}`}>
                % {formatter.format(percent_change_1h)}
            </td>
            <td className={`${percent_change_24h >= 0 ? "green" : "red"}`}>
                % {formatter.format(percent_change_24h)}
            </td>
            <td className={`${percent_change_7d >= 0 ? "green" : "red"}`}>
                % {formatter.format(percent_change_7d)}
            </td>
            <td className={`${percent_change_30d >= 0 ? "green" : "red"}`}>
                % {formatter.format(percent_change_30d)}
            </td>
            <td className={`${percent_change_60d >= 0 ? "green" : "red"}`}>
                % {formatter.format(percent_change_60d)}
            </td>
            <td className={`${percent_change_90d >= 0 ? "green" : "red"}`}>
                % {formatter.format(percent_change_90d)}
            </td>
            <td>{formatter.format(market_cap)} USD</td>
            <td>% {formatter.format(market_cap_dominance)}</td>
            <td>{formatter.format(fdv)} USD</td>
        </TrContainer>
    );
}

const TrContainer = styled.tr`
    max-width: 100%;
    flex-wrap: wrap;
    .red {
        color: red;
        font-weight: bold;
        // color: white;
        // background-color: red;
    }
    .green {
        color: green;
        font-weight: bold;
        // color: white;
        // background-color: green;
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
    .d-flex {
        display: flex;
        justify-content: center;
    }
`;
