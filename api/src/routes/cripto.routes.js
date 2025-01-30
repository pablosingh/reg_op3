import { Router } from "express";
import { getCriptos } from "../controllers/criptos/criptos.controllers.js";
import {
    getActualPriceCMC,
    getActualPriceDB,
} from "../controllers/criptos/getActualPrice.controllers.js";
import { getWatchListCMC } from "../controllers/criptos/watchlist.controllers.js";
const router = Router();

router.get("/criptos", getCriptos); // Trae todas las criptos de la DB
router.get("/dayprice/:cripto", getActualPriceDB); // cripto mas actual
router.get("/daypricecmc/:cripto", getActualPriceCMC);
router.get("/watch", getWatchListCMC);

export default router;
