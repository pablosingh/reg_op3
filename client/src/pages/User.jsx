import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function User() {
    const state = useSelector((state) => state);
    return (
        <div>
            User
            <button onClick={() => console.log(state)}>estado</button>
        </div>
    );
}
