import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadHoldingsFromDB } from "../redux/holdings/actions";
import BuySellComponent from "../components/BuySellComponent";
import {
    secondaryColor,
    tertiaryColor,
    tertiaryHoverColor,
} from "../styles/colors.js";
import Modal from "../components/Modal";
import CreateDatePicker from "../components/CreateDatePicker.jsx";

export default function Create() {
    const initialData = {
        date: "",
        ticker: "",
        number: "",
        price: "",
        total: "",
        buy: true,
        exchange: "",
        comment: "",
    };
    const [data, setData] = useState(initialData);
    const [buy, setBuy] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [stringDate, setStringDate] = useState("");
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const changing = (e) => {
        setData({
            ...data,
            buy,
            [e.target.name]: e.target.value,
        });
    };
    const handlerBuy = (buyValue) => {
        setBuy(buyValue);
    };
    const addOpsToDB = async (toAdd) => {
        console.log(toAdd);
        const apiUrl =
            process.env.REACT_APP_API_URL || "http://localhost:3001/";
        try {
            await fetch(`${apiUrl}operations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(toAdd),
            })
                .then((js) => js.json())
                // .then(res => console.log(res))
                .then(() => dispatch(loadHoldingsFromDB(state.holdings.userId)))
                .catch((e) => console.error(e));
        } catch (err) {
            console.error(err);
        }
    };
    const sending = (e) => {
        let arrayDate = stringDate.split("-");
        const toSend = {
            ...data,
            date: new Date(
                new Date(arrayDate[0], Number(arrayDate[1]) - 1, arrayDate[2]),
            ),
            buy,
            number: Number.parseFloat(data.number),
            price: Number.parseFloat(data.price),
            total:
                Number.parseFloat(data.number) * Number.parseFloat(data.price),
            UserId: state.holdings.userId,
        };
        console.log(toSend);
        addOpsToDB(toSend);
        setData(initialData);
        openModal();
        setTimeout(closeModal, 1000);
    };
    return (
        <Container>
            <SubContainer>
                {/* <CreateDate handlerDate={handlerDate} /> */}
                <CreateDatePicker handlerDate={setStringDate} />
                <Sector>
                    <label>Ticker</label>
                    <InputData
                        type="text"
                        name="ticker"
                        value={data.ticker}
                        className=""
                        onChange={changing}
                    />
                </Sector>
                <Sector>
                    <label>Cantidad</label>
                    <InputData
                        type="text"
                        name="number"
                        value={data.number}
                        className=""
                        onChange={changing}
                    />
                </Sector>
                <Sector>
                    <label>Precio</label>
                    <InputData
                        type="text"
                        name="price"
                        value={data.price}
                        className=""
                        onChange={changing}
                    />
                </Sector>
                <BuySellComponent
                    handlerBuy={handlerBuy}
                    buyInitial={buy}
                    buyDisabled={false}
                />
                <Sector>
                    <label>Exchange</label>
                    <InputData
                        type="text"
                        name="exchange"
                        value={data.exchange}
                        className=""
                        onChange={changing}
                    />
                </Sector>
                <Sector>
                    <label>Comentarios</label>
                    <InputData
                        type="text"
                        name="comment"
                        value={data.comment}
                        className=""
                        onChange={changing}
                    />
                </Sector>
                <Sector>
                    <Btn onClick={sending}>Agregar</Btn>
                    {/* <Btn onClick={()=> console.log(state)}>Estado</Btn>
                    <Btn onClick={()=> console.log(buy)}>buy</Btn> */}
                </Sector>
            </SubContainer>
            <Modal isOpen={showModal} onClose={closeModal} children={"Exito"} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    margin: 0em;
    padding: 0em;
    align-items: center;
    justify-content: center;
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0em;
    padding: 1em;
    align-items: center;
    justify-content: center;
    border: 2px solid #333;
    border-radius: 2em;
    background-color: ${secondaryColor};
`;
const Sector = styled.div`
    color: black;
    display: flex;
    // border: 2px solid #333;
    margin: 0em;
    padding: 0.01em;
    // border-radius: 0.5em;
    align-items: center;
`;
const InputData = styled.input`
    max-width: 7vw;
    margin: 0.2em 0em 0em 0.7em;
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
