import mongoose from "mongoose";
import Transaction from "../models/TransactionModel.js";
import * as tf from "@tensorflow/tfjs-node";
import { LinearRegression } from "ml-regression-simple"; // Import Linear Regression model

// Function to predict expenses
export const predictExpenses = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID");
    }

    // Fetch user transactions (Expenses only)
    const transactions = await Transaction.find({
      user: userId,
      transactionType: "expense",
    });

    if (transactions.length < 2) {
      return { message: "Not enough data for prediction" };
    }

    // Prepare Data for Regression Model
    let data = transactions.map((txn) => ({
      amount: txn.amount,
      date: new Date(txn.date),
      category: txn.category,
    }));

    // Convert Date into numerical value (Months)
    data.sort((a, b) => a.date - b.date); // Sort by date
    let minDate = data[0].date;
    let X = data.map(
      (txn) => (txn.date - minDate) / (1000 * 60 * 60 * 24 * 30)
    ); // Convert to months
    let y = data.map((txn) => txn.amount);

    // Train Linear Regression Model
    let regression = new LinearRegression(X, y);

    // Predict Expense for Next Month
    let nextMonth = (new Date() - minDate) / (1000 * 60 * 60 * 24 * 30) + 1; // Next Month
    let predictedExpense = regression.predict(nextMonth);

    // Find Most Frequent Expense Category
    let categoryCount = {};
    data.forEach((txn) => {
      categoryCount[txn.category] = (categoryCount[txn.category] || 0) + 1;
    });
    let predictedCategory = Object.keys(categoryCount).reduce((a, b) =>
      categoryCount[a] > categoryCount[b] ? a : b
    );

    return {
      predictedExpense: Math.round(predictedExpense),
      predictedCategory,
    };
  } catch (error) {
    console.error("Error in ML Prediction:", error);
    throw new Error("Failed to predict expenses");
  }
};
