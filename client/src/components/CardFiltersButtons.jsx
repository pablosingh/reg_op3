import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
    ORDER_BY_PROFITS_PERCENT_ASC,
    ORDER_BY_PROFITS_PERCENT_DES,
    ORDER_BY_PORTFOLIO_PERCENT_ASC,
    ORDER_BY_PORTFOLIO_PERCENT_DES,
    ORDER_BY_DATE_ASC,
    ORDER_BY_DATE_DES,
} from "../redux/holdings/actions.js";
import {
    ItemHoldingColor,
    secondaryColor,
    tertiaryColor,
    tertiaryHoverColor,
} from "../styles/colors.js";

export default function CardFiltersButtons() {
    const dispatch = useDispatch();
    return (
        <ContainerStyled>
            <Item>
                {/* Ordenar Por : */}
                <SubItem>
                    <Btn
                        onClick={() =>
                            dispatch({
                                type: ORDER_BY_PROFITS_PERCENT_ASC,
                                payload: null,
                            })
                        }
                    >
                        <BtnInside>
                            <label>% de </label>
                            <label>Ganancias</label>
                            <ArrowUpwardIcon className="symbolBtn" />
                        </BtnInside>
                    </Btn>
                    <Btn
                        onClick={() =>
                            dispatch({
                                type: ORDER_BY_PROFITS_PERCENT_DES,
                                payload: null,
                            })
                        }
                    >
                        <BtnInside>
                            <label>% de</label>
                            <label>Ganancias</label>
                            <ArrowDownwardIcon className="symbolBtn" />
                        </BtnInside>
                    </Btn>
                    <Btn
                        onClick={() =>
                            dispatch({
                                type: ORDER_BY_PORTFOLIO_PERCENT_ASC,
                                payload: null,
                            })
                        }
                    >
                        <BtnInside>
                            <label>% del</label>
                            <label>Portafolio</label>
                            <ArrowUpwardIcon className="symbolBtn" />
                        </BtnInside>
                    </Btn>
                    <Btn
                        onClick={() =>
                            dispatch({
                                type: ORDER_BY_PORTFOLIO_PERCENT_DES,
                                payload: null,
                            })
                        }
                    >
                        <BtnInside>
                            <label>% del</label>
                            <label>Portafolio</label>
                            <ArrowDownwardIcon className="symbolBtn" />
                        </BtnInside>
                    </Btn>

                    <Btn
                        onClick={() =>
                            dispatch({
                                type: ORDER_BY_DATE_ASC,
                                payload: null,
                            })
                        }
                    >
                        <BtnInside>
                            <label>Fecha</label>
                            <label>Portafolio</label>
                            <ArrowUpwardIcon className="symbolBtn" />
                        </BtnInside>
                    </Btn>
                    <Btn
                        onClick={() =>
                            dispatch({
                                type: ORDER_BY_DATE_DES,
                                payload: null,
                            })
                        }
                    >
                        <BtnInside>
                            <label>Fecha</label>
                            <label>Portafolio</label>
                            <ArrowDownwardIcon className="symbolBtn" />
                        </BtnInside>
                    </Btn>
                </SubItem>
            </Item>
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
    margin: 0.5em 0em 0em 0em;
    padding: 0em 0em;
    // background-color: red;
`;

const Item = styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: ${ItemHoldingColor};
    margin: 0.1em;
    padding: 0.4em 0.2em;
    border-radius: 0.5em;
    // justify-content: flex-start;
    justify-content: center;
    // align-items: center;
    .red {
        font-weight: bold;
        color: red;
    }
    .green {
        font-weight: bold;
        color: green;
    }
`;
const SubItem = styled.div`
    color: black;
    display: flex;
    // flex-direction: column;
    // background-color: ${secondaryColor};
    // border: 2px solid #333;
    margin: 0.1em;
    padding: 0.3em;
    border-radius: 0.5em;
    flex-wrap: wrap;
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

const BtnInside = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-color: ${secondaryColor};
    // border: 2px solid #333;
    margin: 0.1em;
    padding: 0.3em;
    border-radius: 0.5em;
    .symbolBtn {
        font-size: 15px;
    }
`;
