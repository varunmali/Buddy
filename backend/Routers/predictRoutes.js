import express from "express";
// import { getPredictedExpensesController } from "../controllers/predictController";
import { getPredictedExpensesController } from "../controllers/predictController.js";

const router = express.Router();

// ✅ Define the correct route
router.get("/predict-expenses/:userId", getPredictedExpensesController);

export default router;
