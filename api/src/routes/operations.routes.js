import { Router } from "express";
import {
    // getOperations,
    createOperation,
} from "../controllers/operations/operations.controllers.js";
const router = Router();

// router.get("/operations", getOperations);
router.post("/operations", createOperation);

export default router;
