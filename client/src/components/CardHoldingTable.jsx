import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { updateActualPrice } from "../redux/holdings/actions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { secondaryColor } from "../styles/colors";

export default function CardHoldingTable(props) {
    const {
        id,
        date,
        ticker,
        //
        amount,
        initialPrice,
        initialTotal,
        //
        actualPrice,
        profits,
        profitsPercent,
        portfolioPercent,
        Operations,
    } = props.ticker;
    // const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [showManualPrice, setShowManualPrice] = useState(false);
    const [manualPrice, setManualPrice] = useState(actualPrice);
    const dateTicker = new Date(date);
    const formattedDate = dateTicker.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const formatter = new Intl.NumberFormat("es-ES", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const smallFormatter = new Intl.NumberFormat("es-ES", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    });
    return (
        <TrContainer>
            <td>{formattedDate}</td>
            <td className="negrita">
                <Link to={`/hold/${ticker}`} className="link">
                    {ticker}
                </Link>
            </td>
            <td>{formatter.format(amount)}</td>
            <td>
                <div>
                    ${" "}
                    {initialPrice < 0.09
                        ? smallFormatter.format(initialPrice)
                        : formatter.format(initialPrice)}
                </div>
                {showManualPrice ? (
                    <div className="d-flex">
                        <InputData
                            type="number"
                            name="number"
                            // value={}
                            value={manualPrice}
                            className=""
                            onChange={(e) => setManualPrice(e.target.value)}
                            autoFocus={true}
                        />
                        <Btn
                            onClick={() => {
                                // console.log(manualPrice);
                                setShowManualPrice(!showManualPrice);
                                dispatch(
                                    updateActualPrice(ticker, manualPrice),
                                );
                            }}
                        >
                            <SaveOutlinedIcon className="symbolBtn" />
                        </Btn>
                    </div>
                ) : (
                    <div className="d-flex">
                        ${" "}
                        {actualPrice < 0.09
                            ? smallFormatter.format(actualPrice)
                            : formatter.format(actualPrice)}
                        <Btn
                            onClick={() => setShowManualPrice(!showManualPrice)}
                        >
                            <EditOutlinedIcon className="symbolBtn" />
                        </Btn>
                    </div>
                )}
            </td>
            <td>
                <div>
                    ${" "}
                    {initialTotal < 0.09
                        ? smallFormatter.format(initialTotal)
                        : formatter.format(initialTotal)}
                </div>
                <div>
                    ${" "}
                    {amount * actualPrice < 0.09
                        ? smallFormatter.format(amount * actualPrice)
                        : formatter.format(amount * actualPrice)}
                </div>
            </td>
            <td>
                <div className={`${profitsPercent > 0 ? "green" : "red"}`}>
                    %{" "}
                    {profitsPercent < 0.09 && profitsPercent > -1
                        ? smallFormatter.format(profitsPercent)
                        : formatter.format(profitsPercent)}
                </div>
                <div className={`${profits > 0 ? "green" : "red"}`}>
                    ${" "}
                    {profits < 0.09 && profits > -1
                        ? smallFormatter.format(profits)
                        : formatter.format(profits)}
                </div>
            </td>
            <td
                className={`${portfolioPercent > 4 ? "highPercent" : portfolioPercent < 1.2 ? "lowPercent" : ""}`}
            >
                %{" "}
                {portfolioPercent < 0.09
                    ? smallFormatter.format(portfolioPercent)
                    : formatter.format(portfolioPercent)}
            </td>
        </TrContainer>
    );
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
    .lowPercent {
        color: black;
        font-weight: bold;
        background-color: aqua;
    }
    .d-flex {
        display: flex;
        justify-content: center;
    }
`;

const InputData = styled.input`
    max-width: 7vw;
    margin: 0.2em 0em 0em 0.7em;
`;

const Btn = styled.div`
    color: black;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    background-color: ${secondaryColor};
    // border: 2px solid #333;
    margin: 0.1em 0.2em;
    padding: 0.01em 0.1em;
    border-radius: 0.5em;
    .symbolBtn {
        font-size: 15px;
    }
`;
