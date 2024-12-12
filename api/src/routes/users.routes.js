import { Router } from "express";
import {
    createUser,
    getUserById,
    getUsers,
    getUserByEmail,
} from "../controllers/users/users.controllers.js";
const router = Router();

router.post("/userbyemail", getUserByEmail);
router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", createUser);

export default router;
