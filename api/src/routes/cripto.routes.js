import { Router } from "express";
import {
    addCripto,
    getCriptos,
    addMissingCripto,
    addArrayMissingCripto,
} from "../controllers/criptos/criptos.controllers.js";
import {
    getActualPriceCMC,
    getActualPriceDB,
} from "../controllers/criptos/getActualPrice.controllers.js";
const router = Router();

router.get("/criptos", getCriptos); // Trae todas las criptos de la DB
router.get("/dayprice/:cripto", getActualPriceDB); // cripto mas actual
router.get("/daypricecmc/:cripto", getActualPriceCMC);
router.post("/cripto", addCripto);
router.post("/addmissingcripto", addMissingCripto);
router.post("/addarraymissingcripto", addArrayMissingCripto);

export default router;
