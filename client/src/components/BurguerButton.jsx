import React from "react";
import styled from "styled-components";

function BurguerButton(props) {
    return (
        <Burguer>
            <div
                onClick={props.handleClick}
                className={`icon nav-icon ${props.clicked ? "open" : ""}`}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </Burguer>
    );
}

export default BurguerButton;

const Burguer = styled.div`
    @media (min-width: 768px) {
        display: none;
    }
    z-index: 3;
    position: fixed;
    margin: 0.5em 0em 0em 0.5em;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 0.3em;
    .nav-icon {
        width: 35px;
        height: 30px;
        margin: 10px 10px;
        position: relative;
        cursor: pointer;
        display: inline-block;
        color: #121212;
    }
    .nav-icon span {
        background-color: #fff;
        position: absolute;
        border-radius: 2px;
        transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
        width: 100%;
        height: 4px;
        transition-duration: 500ms;
    }
    // En estado normal /////////////////////////////////////
    .nav-icon span:nth-child(1) {
        top: 0px;
        left: 0px;
    }
    .nav-icon span:nth-child(2) {
        top: 13px;
        left: 0px;
        opacity: 1;
    }
    .nav-icon span:nth-child(3) {
        bottom: 0px;
        left: 0px;
    }
    // Abriendo  /////////////////////////////////////////
    .nav-icon.open span:nth-child(1) {
        transform: rotate(45deg);
        top: 13px;
    }
    .nav-icon.open span:nth-child(2) {
        opacity: 0;
    }
    .nav-icon.open span:nth-child(3) {
        transform: rotate(-45deg);
        top: 13px;
    }
`;
