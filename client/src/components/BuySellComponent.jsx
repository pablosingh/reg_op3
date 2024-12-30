import React, { useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";

export default function BuySellComponent(props) {
    const { handlerBuy, buyInitial, buyDisabled } = props;
    const [checked, setChecked] = useState(buyInitial);
    const [labelSwitch, setLabelSwitch] = useState(
        buyInitial ? "Compra" : "Venta",
    );
    const handleChange = (event) => {
        setChecked(event.target.checked);
        event.target.checked
            ? setLabelSwitch("Compra")
            : setLabelSwitch("Venta");
        handlerBuy(event.target.checked);
    };
    return (
        <div>
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        name="switch"
                        color="primary"
                        disabled={buyDisabled}
                    />
                }
                label={labelSwitch}
            />
        </div>
    );
}
