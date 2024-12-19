import Router from "express";
import {
    createTask,
    getTasksByHoldingId,
} from "../controllers/tasks/tasks.controllers.js";

const router = Router();

router.get("/tasks/holdingid", getTasksByHoldingId);
router.post("/tasks/create", createTask);

export default router;
