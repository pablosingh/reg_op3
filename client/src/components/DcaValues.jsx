import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ItemHoldingColor, secondaryColor } from "../styles/colors";

const DcaValues = (props) => {
    const [inputValue, setInputValue] = useState(0.0);
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
    // const initValues = {
    //     amount: 0.0,
    //     initialPrice: 0.0,
    //     initialTotal: 0.0,
    //     actualPrice: 0.0,
    //     actualTotal: 0.0,
    //     profits: 0.0,
    //     profitsPercent: 0,
    // };
    const toAverage = {
        addTotal: 0.0,
        amount: 0.0,
        actualPrice: 0.0,
        globalTotal: 0.0,
        totalAmount: 0.0,
        dcaPrice: 0.0,
        dcaPercent: 0.0,
    };
    const [average, setAverage] = useState(toAverage);
    const [arrayAverage, setArrayAverage] = useState([]);
    const onInputChange = (event) => {
        console.log(event.target.value);
        setInputValue(parseFloat(event.target.value));
        calculateAverage(parseFloat(event.target.value));
    };
    const calculateAverage = (addTotal) => {
        const auxGlobalTotal = addTotal + initialTotal;
        const auxAmount = addTotal / actualPrice;
        const auxTotalAmount = auxAmount + amount;
        const auxDcaPrice = auxGlobalTotal / auxTotalAmount;
        const objAverage = {
            addTotal,
            amount: auxAmount,
            actualPrice,
            globalTotal: auxGlobalTotal,
            totalAmount: auxTotalAmount,
            dcaPrice: auxDcaPrice,
            dcaPercent: ((actualPrice - auxDcaPrice) * 100) / auxDcaPrice,
        };
        setAverage(objAverage);
        return objAverage;
    };
    useEffect(() => {
        const auxArrayAverage = [];
        for (let i = 1; i <= 100; i++) {
            auxArrayAverage.push(calculateAverage(initialTotal * i));
        }
        setArrayAverage([...auxArrayAverage]);
    }, [initialTotal]);
    return (
        <>
            <h4>Valores para DCA</h4>
            <input
                type="text"
                id="addTotal"
                name="addTotal"
                onChange={onInputChange}
                value={inputValue}
            />
            <button onClick={() => console.log(average)}> average</button>
            <TableContainer>
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Total Agregado</th>
                        <th>Unidades</th>
                        <th>Precio Actual</th>
                        <th>Total General</th>
                        <th>Unidades Total</th>
                        <th>DCA</th>
                        <th>Porcetaje de Ganancia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Manual</td>
                        <td>{average.addTotal.toFixed(2)}</td>
                        <td>{average.amount.toFixed(2)}</td>
                        <td>{average.actualPrice.toFixed(2)}</td>
                        <td>{average.globalTotal.toFixed(2)}</td>
                        <td>{average.totalAmount.toFixed(2)}</td>
                        <td>{average.dcaPrice.toFixed(2)}</td>
                        <td>{average.dcaPercent.toFixed(2)} %</td>
                    </tr>
                    {arrayAverage &&
                        arrayAverage.map((item, i) => {
                            return (
                                <tr>
                                    <td>x{i + 2}</td>
                                    <td>{item.addTotal?.toFixed(2)}</td>
                                    <td>{item.amount?.toFixed(2)}</td>
                                    <td>{item.actualPrice?.toFixed(2)}</td>
                                    <td>{item.globalTotal?.toFixed(2)}</td>
                                    <td>{item.totalAmount?.toFixed(2)}</td>
                                    <td>{item.dcaPrice?.toFixed(2)}</td>
                                    <td>{item.dcaPercent?.toFixed(2)} %</td>
                                </tr>
                            );
                        })}
                </tbody>
            </TableContainer>
        </>
    );
};

export default DcaValues;

const TableContainer = styled.table`
    // width: 100%;
    font-size: 1em;
    text-align: center;
    border-collapse: collapse;
    margin: 0.2em 1em;
    padding: 0.1em;
    thead th {
        border: 2px solid black;
        top: 0;
        position: sticky;
        background-color: ${secondaryColor};
        z-index: 1;
    }
    td {
        padding: 0.05em 0.2em;
        border: 1px solid black;
    }
    tbody tr:nth-child(odd) {
        background-color: ${ItemHoldingColor};
    }
    // tbody tr:nth-child(even) {
    //     background-color: rgb(73, 190, 229);
    // }
`;
