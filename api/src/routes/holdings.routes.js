import { Router } from "express";
import {
    getHoldings,
    createHolding,
    getHoldingsByUserId,
    updateCommentHolding,
} from "../controllers/holdings/holdings.controllers.js";
const router = Router();

router.get("/holdings", getHoldings);
router.get("/holdings/:userId", getHoldingsByUserId);
router.post("/holdings", createHolding);

router.put("/holdings", updateCommentHolding);
// router.delete('/holdings/:id');

export default router;
