import React, { useState } from "react";
import styled from "styled-components";
import CardHolding from "../components/CardHolding";
import { useSelector } from "react-redux";
import Total from "../components/Total";
import CardFiltersButtons from "../components/CardFiltersButtons.jsx";
import HeadTableHolding from "../components/HeadTableHolding.jsx";
import { tertiaryColor, tertiaryHoverColor } from "../styles/colors.js";

export default function Holdings() {
    const arrayHoldings = useSelector((state) => state?.holdings.holdings);
    const state = useSelector((state) => state);
    const [showTable, setShowTable] = useState(true);
    return (
        <ContainerStyled>
            {/* <button onClick={() => console.log(arrayHoldings)}>Holds</button>
            <button onClick={() => console.log(state)}>Estado</button> */}
            <CardFiltersButtons />
            {/* <Btn onClick={() => setShowTable(!showTable)}>Mostrar Tabla</Btn> */}
            {showTable ? (
                <HeadTableHolding />
            ) : (
                arrayHoldings &&
                arrayHoldings?.map((hold) => (
                    <CardHolding ticker={hold} key={hold.id} />
                ))
            )}
            <Total />
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0em 0em;
    padding: 0em 0em;
    // background-color: red;
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
