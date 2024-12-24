import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadHoldingsFromDB } from "../redux/holdings/actions";
import BuySellComponent from "./BuySellComponent";
import {
    secondaryColor,
    tertiaryColor,
    tertiaryHoverColor,
} from "../styles/colors";

export default function CardTicker(props) {
    const { id, date, number, price, total, buy, exchange, comment } =
        props.ticker;
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const dateTicker = new Date(date);
    const formattedDate = dateTicker.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const initialData = {
        id,
        date,
        // ticker,
        number,
        price,
        total,
        buy: buy,
        exchange,
        comment,
    };
    const [editDisabled, setEditDisabled] = useState(true);
    const [data, setData] = useState(initialData);
    const [buyState, setBuyState] = useState(buy);
    const handlerBuy = (buyValue) => {
        setBuyState(buyValue);
    };
    const changing = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const updating = async (e) => {
        setEditDisabled(!editDisabled);
        const toUpdate = {
            ...data,
            number: Number(data.number),
            price: Number(data.price),
            total: Number(data.number * data.price),
            buy: buyState,
        };
        setData(toUpdate);
        // console.log(toUpdate);
        const apiUrl = process.env.REACT_APP_API_URL;
        // console.log(apiUrl);
        try {
            await fetch(`${apiUrl}operations`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(toUpdate),
            })
                .then((js) => js.json())
                // .then(res => console.log(res))
                .then(() => dispatch(loadHoldingsFromDB(state.holdings.userId)))
                .catch((e) => console.error(e));
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <Container>
            <Sector>
                <label>Fecha</label> {formattedDate}
            </Sector>
            <Sector>
                <label>Cantidad </label>
                {editDisabled ? (
                    <label>{data.number}</label>
                ) : (
                    <InputData
                        type="number"
                        name="number"
                        value={data.number}
                        disabled={editDisabled}
                        onChange={changing}
                    />
                )}
            </Sector>
            <Sector>
                <label>Precio </label>
                {editDisabled ? (
                    <label>{data.price}</label>
                ) : (
                    <InputData
                        type="number"
                        name="price"
                        value={data.price}
                        disabled={editDisabled}
                        onChange={changing}
                    />
                )}
            </Sector>
            <Sector>
                <label>Total </label>
                {editDisabled ? (
                    <label>{data.total}</label>
                ) : (
                    <InputData
                        type="number"
                        name="total"
                        value={data.total}
                        disabled={true}
                        onChange={changing}
                    />
                )}
            </Sector>
            <Sector>
                <label>Estado</label>
                <BuySellComponent
                    handlerBuy={handlerBuy}
                    buyInitial={buy}
                    buyDisabled={editDisabled}
                />
            </Sector>
            <Sector>
                <label>Exchange</label>
                {editDisabled ? (
                    <label>{data.exchange}</label>
                ) : (
                    <InputData
                        type="text"
                        name="exchange"
                        value={data.exchange}
                        disabled={editDisabled}
                        onChange={changing}
                    />
                )}
            </Sector>
            <Sector>
                <label>Comentarios</label>
                {editDisabled ? (
                    <label>{data.comment}</label>
                ) : (
                    <InputData
                        type="text"
                        name="comment"
                        value={data.comment}
                        disabled={editDisabled}
                        onChange={changing}
                    />
                )}
            </Sector>
            {/* <Sector><Btn onClick={()=>console.log(data)}>Item</Btn></Sector> */}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    background-color: ${secondaryColor};
    justify-content: flex-start;
    // margin: 0.5em;
    // padding: 0.1em;
    border-radius: 0.5em;
    flex-wrap: wrap;
`;
const InputData = styled.input`
    max-width: 7vw;
`;
const Sector = styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    border: 2px solid #333;
    margin: 0.3em;
    padding: 0.1em;
    border-radius: 0.5em;
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
