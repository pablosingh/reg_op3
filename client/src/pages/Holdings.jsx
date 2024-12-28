import React from "react";
import styled from "styled-components";
import CardHolding from "../components/CardHolding";
import { useSelector } from "react-redux";
import Total from "../components/Total";

export default function Holdings() {
    const arrayHoldings = useSelector((state) => state?.holdings.holdings);
    const state = useSelector((state) => state);
    return (
        <ContainerStyled>
            <button onClick={() => console.log(arrayHoldings)}>
                Tenencias
            </button>
            <button onClick={() => console.log(state)}>Estado</button>
            {/* <CardHolding /> */}
            {arrayHoldings &&
                arrayHoldings.map((hold) => (
                    <CardHolding ticker={hold} key={hold.id} />
                ))}
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
