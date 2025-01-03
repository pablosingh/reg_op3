import React, { useState } from "react";

export default function CreateDatePicker({ handlerDate }) {
    const [selectedDate, setSelectedDate] = useState("");

    const handleChange = (event) => {
        // let strDate = "";
        // strDate = event.target.value;
        // let arrayDate = strDate.split("-");
        setSelectedDate(event.target.value);
        // console.log(new Date(arrayDate[0], arrayDate[1], arrayDate[2]));
        // console.log(arrayDate);
        handlerDate(event.target.value);
    };

    return (
        <div>
            <label htmlFor="fecha">Fecha : </label>
            <input
                type="date"
                id="fecha"
                value={selectedDate}
                onChange={handleChange}
            />
            {/* <p>Fecha seleccionada : {selectedDate}</p> */}
        </div>
    );
}
