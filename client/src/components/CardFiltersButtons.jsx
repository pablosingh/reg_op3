import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
    ORDER_BY_PROFITS_PERCENT_ASC,
    ORDER_BY_PROFITS_PERCENT_DES,
    ORDER_BY_PORTFOLIO_PERCENT_ASC,
    ORDER_BY_PORTFOLIO_PERCENT_DES,
} from "../redux/holdings/actions.js";

export default function CardFiltersButtons() {
    const dispatch = useDispatch();
    return (
        <ContainerStyled>
            Ordenar Por :
            <button
                onClick={() =>
                    dispatch({
                        type: ORDER_BY_PROFITS_PERCENT_ASC,
                        payload: null,
                    })
                }
            >
                % de Ganancias ASC
            </button>
            <button
                onClick={() =>
                    dispatch({
                        type: ORDER_BY_PROFITS_PERCENT_DES,
                        payload: null,
                    })
                }
            >
                % de Ganancias DES
            </button>
            <button
                onClick={() =>
                    dispatch({
                        type: ORDER_BY_PORTFOLIO_PERCENT_ASC,
                        payload: null,
                    })
                }
            >
                % del Portafolio ASC
            </button>
            <button
                onClick={() =>
                    dispatch({
                        type: ORDER_BY_PORTFOLIO_PERCENT_DES,
                        payload: null,
                    })
                }
            >
                % del Portafolio DES
            </button>
        </ContainerStyled>
    );
}

const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    // height: 100%;
    margin: 0em 0em;
    padding: 0em 0em;
    // background-color: red;
`;
