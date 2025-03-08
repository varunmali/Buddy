import Transaction from "../models/TransactionModel.js";
import moment from "moment";
import { SimpleLinearRegression } from "ml-regression"; // ✅ Correct Import

export const getPredictedExpensesController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // ✅ Check if user exists
    const userExists = await Transaction.exists({ user: userId });
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Fetch expense transactions for this user
    const transactions = await Transaction.find({
      user: userId,
      transactionType: "expense",
    }).sort({ date: 1 }); // Sort by date

    console.log("🔍 Transactions Fetched:", transactions);

    if (transactions.length < 2) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough data for prediction" });
    }

    // ✅ Prepare Training Data
    let X = transactions.map((txn, index) => index); // Time index
    let Y = transactions.map((txn) => Math.abs(txn.amount)); // Ensure all amounts are positive

    console.log("📊 Training Data:", { X, Y });

    // ✅ Train the Model
    const regression = new SimpleLinearRegression(X, Y);
    const nextMonthIndex = X.length; // Next month index
    let predictedExpense = regression.predict(nextMonthIndex);

    // ✅ Prevent Negative or Zero Predictions
    if (predictedExpense <= 0) {
      predictedExpense = Math.max(...Y) * 0.8; // Use 80% of the highest expense
    }

    console.log("📢 Predicted Expense:", predictedExpense);

    return res.json({
      success: true,
      predictedExpense: Math.round(predictedExpense),
      message: "Predicted next month's expense successfully",
    });
  } catch (error) {
    console.error("❌ Prediction Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error predicting expenses" });
  }
};
