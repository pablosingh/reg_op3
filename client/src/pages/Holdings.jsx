import React from "react";
import styled from "styled-components";
import CardHolding from "../components/CardHolding";

export default function Holdings() {
    return (
        <ContainerStyled>
            <CardHolding />
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
