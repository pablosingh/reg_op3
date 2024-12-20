import { Router } from "express";
import {
    addCripto,
    getCriptos,
} from "../controllers/criptos/criptos.controllers.js";
import { getActualPriceDB } from "../controllers/criptos/getActualPrice.controllers.js";
const router = Router();

router.get("/criptos", getCriptos); // Trae todas las criptos de la DB
router.get("/dayprice/:cripto", getActualPriceDB); // cripto mas actual
router.post("/cripto", addCripto);

export default router;
