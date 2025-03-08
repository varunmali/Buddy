import express from "express";
import {
  addTransactionController,
  deleteTransactionController,
  getAllTransactionController,
  updateTransactionController,
  generatePDFController,
  generateExcelController,
} from "../controllers/transactionController.js";

// import { getPredictedExpensesController } from "../controllers/transactionController.js"; // ✅ AI Prediction

const router = express.Router();

router.route("/addTransaction").post(addTransactionController);

router.route("/getTransaction").post(getAllTransactionController);

router.route("/deleteTransaction/:id").post(deleteTransactionController);

router.route("/updateTransaction/:id").put(updateTransactionController);

router.get("/generatePDF/:userId", generatePDFController);
// router.route("/export/pdf/:userId").get(generatePDFController);

router.get("/generateExcel/:userId", generateExcelController);

export default router;
