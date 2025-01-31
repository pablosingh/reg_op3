import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BurguerButton from "./BurguerButton";
import { primaryColor } from "../styles/colors";

export default function MobileMenu() {
    const [openMenu, setOpenMenu] = useState(false);
    const handleClick = () => setOpenMenu(!openMenu);
    return (
        <>
            <BurguerButton clicked={openMenu} handleClick={handleClick} />
            <MenuContainer className={`${openMenu ? `active` : ``}`}>
                <DivFlex>
                    <Link
                        to="/"
                        className="link_btn"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        Tenencias
                    </Link>
                    <Link
                        to="/create"
                        className="link_btn"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        Crear
                    </Link>
                    <Link
                        to="/user"
                        className="link_btn"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        Usuario
                    </Link>
                    <Link
                        to="/watch"
                        className="link_btn"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        Seguimiento
                    </Link>
                </DivFlex>
            </MenuContainer>
        </>
    );
}

const MenuContainer = styled.div`
    position: fixed;
    top: 0vh;
    left: -110vw;
    margin: 0em 0em;
    padding: 0em 0em;
    transition: all 0.5s ease;
    background-color: black;
    background-color: ${primaryColor};
    z-index: 2;
    &.active {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0 0 80% 0;
    }
`;

const DivFlex = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3.5em 0em 0em 0em;
    padding: 0em 0em 0em 1em;
    * {
        text-decoration: none;
        color: white;
        padding: 1em 0em 0em 0em;
    }
`;
