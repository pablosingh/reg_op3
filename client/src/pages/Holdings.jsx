import React from "react";
import styled from "styled-components";
import CardHolding from "../components/CardHolding";
import { useSelector } from "react-redux";

export default function Holdings() {
    const arrayHoldings = useSelector((state) => state?.holdings.holdings);
    return (
        <ContainerStyled>
            <button onClick={() => console.log(arrayHoldings)}>Estado</button>
            {/* <CardHolding /> */}
            {arrayHoldings &&
                arrayHoldings.map((hold) => (
                    <CardHolding ticker={hold} key={hold.id} />
                ))}
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
