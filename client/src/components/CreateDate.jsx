import { useState } from "react";
import styled from "styled-components";

export default function CreateDate({ handlerDate }) {
    const today = new Date();
    const initialDate = {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
    };
    const [newDate, setNewDate] = useState(initialDate);
    const changing = (e) => {
        setNewDate({
            ...newDate,
            [e.target.name]: e.target.value,
        });
        handlerDate({
            ...newDate,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <Container>
            <Sector>Fecha</Sector>
            <Sector>
                <InputDate
                    type="number"
                    name="day"
                    value={newDate.day}
                    onChange={changing}
                ></InputDate>
            </Sector>
            <Sector>
                <InputDate
                    type="number"
                    name="month"
                    value={newDate.month}
                    onChange={changing}
                ></InputDate>
            </Sector>
            <Sector>
                <InputDate
                    type="number"
                    name="year"
                    value={newDate.year}
                    onChange={changing}
                ></InputDate>
                {/* <Btn onClick={()=> {
                    const dateTicker = new Date(newDate.year, newDate.month, newDate.day);
                    console.log(dateTicker);
                }}>Mostrar</Btn> */}
            </Sector>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    // background-color: rgba(22,130,177,255);
    margin: 0em;
    padding: 0em;
    align-items: center;
    justify-content: center;
    // border: 2px solid #333;
`;

const InputDate = styled.input`
    max-width: 7vw;
`;

const Sector = styled.div`
    max-width: 25vw;
    color: black;
    display: flex;
    // border: 2px solid #333;
    // margin: 0.01em 0.3em;
    // margin: 0em;
    // border-radius: 0.5em;
    padding: 0.5em 0.5em 0.5em 0.1em;
    align-items: center;
`;

const Btn = styled.button`
    background-color: rgba(8, 108, 9, 1);
    color: white;
    border-radius: 1em;
    padding: 0.2em 1em;
    transition: all 0.4s ease;
    &:hover {
        background-color: rgba(8, 108, 9, 0.5);
        color: black;
    }
`;
