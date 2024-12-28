import React from "react";
import styled from "styled-components";
import {
    primaryColor,
    tertiaryColor,
    tertiaryHoverColor,
    secondaryColor,
    ItemHoldingColor,
} from "../styles/colors";
import { useSelector } from "react-redux";

export default function Total() {
    const state = useSelector((state) => state);
    return (
        <Container>
            <Sector>
                <Item>
                    Total Inicial
                    <SubItem>
                        $ {state?.holdings.totalInvestedCapital?.toFixed(2)}
                    </SubItem>
                    Total Final
                    <SubItem>
                        $ {state?.holdings.totalActualPrice?.toFixed(2)}
                    </SubItem>
                </Item>
                <Item>
                    Total de Ganancias
                    <SubItem>
                        $ {state?.holdings.totalProfits?.toFixed(2)}
                    </SubItem>
                </Item>
            </Sector>
        </Container>
    );
}

const Container = styled.div`
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
