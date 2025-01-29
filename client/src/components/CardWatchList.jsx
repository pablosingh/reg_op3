import React, { useState } from "react";
import styled from "styled-components";

export default function CardWatchList() {
    const [data, setData] = useState({});
    const request = async () => {};
    return <TrContainer>CardWatchList</TrContainer>;
}

const TrContainer = styled.tr`
    .red {
        font-weight: bold;
        // color: red;
        color: white;
        background-color: red;
    }
    .green {
        font-weight: bold;
        // color: green;
        color: white;
        background-color: green;
    }
    .negrita {
        font-weight: bold;
    }
    .link {
        text-decoration: none;
        color: black;
    }
    .highPercent {
        color: white;
        font-weight: bold;
        background-color: blue;
    }
    .d-flex {
        display: flex;
        justify-content: center;
    }
`;
