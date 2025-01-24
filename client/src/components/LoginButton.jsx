import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import image from "../images/btc.jpg";
import styled from "styled-components";
import { tertiaryColor, tertiaryHoverColor } from "../styles/colors";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Container>
            <SubContainer>
                <Btn onClick={() => loginWithRedirect()}>LogIn</Btn>
            </SubContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    // // background-color: rgba(0,0,0,0.8);
    // &::before{
    //     content: '';
    //     position: fixed;
    //     top: 0vh;
    //     left: 0vw;
    //     width: 100vw;
    //     height: 100vh;
    //     background-repeat: repeat-y;
    //     background: url();
    //     opacity: 0.9;
    //     z-index: -1;
    // }
`;
const SubContainer = styled.div`
    padding: 4em 4em;
    margin: 0em;
    width: 100%;
    height: 100%;
`;
const Btn = styled.button`
    background-color: ${tertiaryColor};
    color: white;
    border-radius: 1em;
    padding: 0.2em 1em;
    margin: 0.3em;
    transition: all 0.4s ease;
    &:hover {
        background-color: ${tertiaryHoverColor};
        color: black;
    }
`;

export default LoginButton;
