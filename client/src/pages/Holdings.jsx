import React from "react";
import styled from "styled-components";
import CardHolding from "../components/CardHolding";
import { useSelector } from "react-redux";

export default function Holdings() {
    const state = useSelector((state) => state);
    return (
        <ContainerStyled>
            <button onClick={() => console.log(state)}>Estado</button>
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
