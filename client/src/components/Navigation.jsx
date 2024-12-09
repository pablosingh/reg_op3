import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navigation() {
    return (
        <ContainerStyled>
            <Link to="/holdings" className="link">
                Tenencias
            </Link>
            <Link to="/create" className="link">
                Crear
            </Link>
            <Link to="/user" className="link">
                Usuario
            </Link>
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div`
    margin: 0em 0em;
    padding: 0em 0em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(25, 125, 175, 255);
    height: 15vh;
    .link {
        color: black;
        font-weight: bold;
        margin: 0em 0em;
        padding: 0.2em 0.7em;
        border-radius: 5em;
        text-decoration: none;
        background-color: rgba(135, 213, 225, 255);
    }
`;
