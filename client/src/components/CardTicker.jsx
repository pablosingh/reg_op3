import styled from "styled-components";
import BuySellComponent from "./BuySellComponent";
import {
    secondaryColor,
    tertiaryColor,
    tertiaryHoverColor,
} from "../styles/colors";

export default function CardTicker(props) {
    const { id, date, number, price, total, buy, exchange, comment } =
        props.ticker;
    const dateTicker = new Date(date);
    const formattedDate = dateTicker.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const formatter = new Intl.NumberFormat("es-ES", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    });
    return (
        <Container>
            <Sector>
                <label>Fecha</label> {formattedDate}
            </Sector>
            <Sector>
                <label>Cantidad </label>
                <label>{formatter.format(number)}</label>
            </Sector>
            <Sector>
                <label>Precio </label>
                <label>{formatter.format(price)}</label>
            </Sector>
            <Sector>
                <label>Total </label>
                <label>{formatter.format(total)}</label>
            </Sector>
            <Sector>
                <label>Estado</label>
                <BuySellComponent
                    handlerBuy={() => {}}
                    buyInitial={buy}
                    buyDisabled={true}
                />
            </Sector>
            <Sector>
                <label>Exchange</label>
                <label>{exchange}</label>
            </Sector>
            <Sector>
                <label>Comentarios</label>
                <label>{comment}</label>
            </Sector>
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
