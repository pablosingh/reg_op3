import { Router } from "express";
import {
    getOperations,
    createOperation,
    updateOperation,
    deleteOperation,
} from "../controllers/operations/operations.controllers.js";
const router = Router();

router.get("/operations", getOperations);
router.post("/operations", createOperation);

router.put("/operations", updateOperation);
router.delete("/operations/:id", deleteOperation);

export default router;
