import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loadUserId } from "../redux/holdings/actions";
import { useDispatch } from "react-redux";

export default function Navigation() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            loadUserId({
                email: "pablo.roberto.singh@gmail.com",
                name: "Pablo Roberto Singh",
            }),
        );
    }, []);
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
