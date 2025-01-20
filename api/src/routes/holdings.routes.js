import { Router } from "express";
import {
    getAllHoldings,
    getHoldingsByUserIdWithActualPrices,
} from "../controllers/holdings/holdings.controllers.js";
const router = Router();

router.get("/holdings", getAllHoldings);
router.get("/holdings/all/:userId", getHoldingsByUserIdWithActualPrices);

export default router;
