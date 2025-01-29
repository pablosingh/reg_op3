import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { secondaryColor } from "../styles/colors.js";

export default function User() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <Container>
                <SubContainer>
                    <img
                        src={user.picture}
                        alt={user.name}
                        className="img_class"
                    />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    {/* <button onClick={()=> console.log(user)}>mostrar</button> */}
                </SubContainer>
            </Container>
        )
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    min-width: 50vw;
    padding: 0em 0em;
    margin: 0em;
    align-items: center;
    justify-content: center;
    .img_class {
        width: 10vw;
        border-radius: 50%;
    }
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0em;
    padding: 1em;
    align-items: center;
    justify-content: center;
    border: 2px solid #333;
    border-radius: 2em;
    background-color: ${secondaryColor};
`;
