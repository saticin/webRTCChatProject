import express from "express";
import {
    register,
    loging,
    logout,
    authenticateuser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loging);
router.post("/logout", logout);
router.post("/authenticate", authenticateuser);
export default router;
