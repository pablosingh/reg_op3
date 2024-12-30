import React from "react";
import styled from "styled-components";
import { secondaryColor } from "../styles/colors";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <Container>
            <ModalContainer>
                <h2>{children}</h2>
                {/* <button onClick={onClose}>X</button> */}
            </ModalContainer>
        </Container>
    );
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: green;
    // background: ${secondaryColor};
    width: 10%;
    padding: 1em 2em;
    border-radius: 5em;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
