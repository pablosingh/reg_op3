import React, { useState } from "react";
import styled from "styled-components";
import {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    tertiaryHoverColor,
    ItemHoldingColor,
} from "../styles/colors";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CardTicker from "./CardTicker";

export default function CardHolding(props) {
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
        Operations,
    } = props.ticker;
    const [showOps, setShowOps] = useState(false);
    const dateTicker = new Date(date);
    const formattedDate = dateTicker.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    return (
        <ContainerStyled>
            <Sector>
                <Item>
                    <SubItem>{formattedDate}</SubItem>
                </Item>
                <Item>
                    <label>{ticker} </label>
                    <SubItem>{amount}</SubItem>
                </Item>
                <Item>
                    <label>Precio Inicial</label>
                    <SubItem>${initialPrice}</SubItem>
                    <label>Precio Final</label>
                    <SubItem>${actualPrice?.toFixed(2)}</SubItem>
                </Item>
                <Item>
                    <label>Capital Inicial</label>
                    <SubItem>${initialTotal?.toFixed(2)}</SubItem>
                    <label>Capital Final</label>
                    <SubItem>${(amount * actualPrice)?.toFixed(2)}</SubItem>
                </Item>
                <Item>
                    <label>Ganancias </label>
                    <SubItem>${profits?.toFixed(2)}</SubItem>
                </Item>
                <Item>
                    <label>% Portafolio </label>
                    <SubItem
                        className={`${actualPrice * 100 > 0 ? "green" : "red"}`}
                    >
                        % {(amount * actualPrice * 100).toFixed(2)}
                    </SubItem>
                </Item>
                <button
                    className="myButton"
                    onClick={() => setShowOps(!showOps)}
                >
                    <ArrowDownwardIcon />
                </button>
            </Sector>

            {showOps ? (
                <DivOps>
                    {Operations &&
                        Operations.map((o) => (
                            <CardTicker ticker={o} key={o.id} />
                        ))}
                </DivOps>
            ) : null}
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    flex-wrap: wrap;
    width: fit-content;
    background-color: ${primaryColor};
    margin: 0.5em 0.5em 0em 0.5em;
    padding: 1em 2em;
    border-radius: 5em;
    .myButton {
        color: white;
        margin: 0em 0.3em;
        padding: 0.1em 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5em;
        border: none;
        background-color: ${tertiaryColor};
        transition: all 0.4s ease;
        &:hover {
            background-color: ${tertiaryHoverColor};
            color: black;
        }
    }
`;

const Sector = styled.div`
    color: black;
    display: flex;
    // border: 2px solid #333;
    margin: 0.01em 0.5em 0em 0.5em;
    // padding: 0.05em;
    border-radius: 0.5em;
    flex-wrap: wrap;
`;
const DivOps = styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    margin: 0.1em;
    padding: 0.1em;
    border-radius: 0.5em;
    flex-wrap: wrap;
`;
const Item = styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: ${ItemHoldingColor};
    margin: 0.1em;
    padding: 0.4em 0.2em;
    border-radius: 0.5em;
    // justify-content: flex-start;
    justify-content: center;
    // align-items: center;
    .red {
        font-weight: bold;
        color: red;
    }
    .green {
        font-weight: bold;
        color: green;
    }
`;
const SubItem = styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    background-color: ${secondaryColor};
    // border: 2px solid #333;
    margin: 0.1em;
    padding: 0.3em;
    border-radius: 0.5em;
    flex-wrap: wrap;
`;

const Btn = styled.button`
    background-color: ${tertiaryColor};
    color: white;
    border-radius: 1em;
    padding: 0.2em 1em;
    margin: 0.3em;
    transition: all 0.4s ease;
    &:hover {
        background-color: ${tertiaryHoverColor};
        color: black;
    }
`;

const InputData = styled.input`
    max-width: 7vw;
`;
