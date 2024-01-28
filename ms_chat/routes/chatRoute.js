import express from "express";
import { messageSave } from "../controllers/chatController.js";

const router = express.Router();

router.post("/messageSave", messageSave);

export default router;
