import { Router } from "express";
import {
    getAllHoldings,
    getHoldingsByUserId,
} from "../controllers/holdings/holdings.controllers.js";
const router = Router();

router.get("/holdings", getAllHoldings);
router.get("/holdings/:userId", getHoldingsByUserId);

export default router;
