import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CardTicker from "../components/CardTicker";
import CardHolding from "../components/CardHolding";
import { LOAD_ACTUAL_HOLDING } from "../redux/holdings/actions";

export default function Hold() {
    const params = useParams();
    const dispatch = useDispatch();
    // const state = useSelector((state) => state);
    const actualHold = useSelector((state) => state?.holdings?.actualHolding);
    useEffect(() => {
        console.log(params);
        dispatch({
            type: LOAD_ACTUAL_HOLDING,
            payload: params.hold,
        });
    }, []);
    return (
        <div>
            {/* Hold : {params.hold} */}
            {/* <button onClick={() => console.log(actualHold)}>estado</button> */}
            <CardHolding ticker={actualHold} />
            {/* <CardTicker /> */}
        </div>
    );
}
