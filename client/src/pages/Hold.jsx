import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CardTicker from "../components/CardTicker";
import CardHolding from "../components/CardHolding";

export default function Hold() {
    const params = useParams();
    const arrayHoldings = useSelector((state) => state?.holdings.holdings);
    const actualHold = arrayHoldings.find((a) => a.ticker == params.ticker);
    return (
        <div>
            Hold : {params.hold}
            <CardHolding />
            <CardTicker />
        </div>
    );
}
