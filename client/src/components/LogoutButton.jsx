import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { tertiaryColor, tertiaryHoverColor } from "../styles/colors";

export default function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <Btn
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
        >
            Log Out
        </Btn>
    );
}

const Btn = styled.div`
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
