import Transaction from "../models/TransactionModel.js";
import PDFDocument from "pdfkit";
import User from "../models/UserSchema.js";
import moment from "moment";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "public/assets";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

// File Filter for PNG and JPG only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG and PNG files are allowed"), false);
  }
};

// Multer Middleware
const upload = multer({ storage, fileFilter }).single("image");

export const addTransactionController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });

    try {
      const {
        userId,
        title,
        amount,
        description,
        category,
        date,
        transactionType,
      } = req.body;
      const imagePath = req.file ? `/assets/${req.file.filename}` : ""; // Store relative path

      const transaction = new Transaction({
        user: userId,
        title,
        amount,
        description,
        category,
        date,
        transactionType,
        image: imagePath,
      });

      await transaction.save();
      res.status(201).json({
        success: true,
        message: "Transaction added successfully",
        transaction,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error adding transaction" });
    }
  });
};

export const getAllTransactionController = async (req, res) => {
  try {
    const { userId, type, frequency, startDate, endDate } = req.body;

    console.log(userId, type, frequency, startDate, endDate);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Create a query object with the user and type conditions
    const query = {
      user: userId,
    };

    if (type !== "all") {
      query.transactionType = type;
    }

    // Add date conditions based on 'frequency' and 'custom' range
    if (frequency !== "custom") {
      query.date = {
        $gt: moment().subtract(Number(frequency), "days").toDate(),
      };
    } else if (startDate && endDate) {
      query.date = {
        $gte: moment(startDate).toDate(),
        $lte: moment(endDate).toDate(),
      };
    }

    // console.log(query);

    const transactions = await Transaction.find(query);

    // console.log(transactions);

    return res.status(200).json({
      success: true,
      transactions: transactions,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

export const deleteTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.body.userId;

    // console.log(transactionId, userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const transactionElement = await Transaction.findByIdAndDelete(
      transactionId
    );

    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "transaction not found",
      });
    }

    const transactionArr = user.transactions.filter(
      (transaction) => transaction._id === transactionId
    );

    user.transactions = transactionArr;

    user.save();

    // await transactionElement.remove();

    return res.status(200).json({
      success: true,
      message: `Transaction successfully deleted`,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

export const updateTransactionController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      const transactionId = req.params.id;
      // const { transactionId } = req.params;
      console.log("Received transactionId:", transactionId); // Debugging log

      // Validate transactionId format
      if (!transactionId.match(/^[0-9a-fA-F]{24}$/)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid transaction ID format" });
      }

      const existingTransaction = await Transaction.findById(transactionId);
      if (!existingTransaction) {
        return res
          .status(404)
          .json({ success: false, message: "Transaction not found" });
      }

      // Process the update...
      const { title, amount, description, category, date, transactionType } =
        req.body;
      const imagePath = req.file
        ? `/assets/${req.file.filename}`
        : existingTransaction.image;

      const updateData = {
        title: title || existingTransaction.title,
        amount: amount || existingTransaction.amount,
        description: description || existingTransaction.description,
        category: category || existingTransaction.category,
        date: date || existingTransaction.date,
        transactionType: transactionType || existingTransaction.transactionType,
        image: imagePath,
      };

      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        updateData,
        { new: true }
      );

      return res.json({
        success: true,
        message: "Transaction updated successfully",
        transaction: updatedTransaction,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error updating transaction" });
    }
  });
};

export const generatePDFController = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ user: userId });

    if (!transactions.length)
      return res
        .status(404)
        .json({ success: false, message: "No transactions found" });

    const doc = new PDFDocument({ margin: 30 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=transactions.pdf`);
    doc.pipe(res);

    doc
      .fontSize(12)
      .text("Title", 50, 100)
      .text("Amount", 150, 100)
      .text("Category", 250, 100)
      .text("Type", 350, 100)
      .text("Date", 450, 100)
      .text("Image", 550, 100)
      .moveDown();
    let yPosition = 120;
    const defaultRowHeight = 20;

    transactions.forEach((txn) => {
      const imageHeight = txn.image ? 50 : 0;
      doc
        .fontSize(10)
        .text(txn.title, 50, yPosition)
        .text(`$${txn.amount}`, 150, yPosition)
        .text(txn.category, 250, yPosition)
        .text(txn.transactionType, 350, yPosition)
        .text(txn.date.toDateString(), 450, yPosition);

      if (txn.image) {
        doc.image(`public${txn.image}`, 550, yPosition, {
          width: 50,
          height: imageHeight,
        });
      } else {
        doc.text("No Image", 550, yPosition);
      }

      doc.moveDown();
      yPosition += Math.max(defaultRowHeight, imageHeight);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ success: false, message: "Error generating PDF" });
  }
};

export const generateExcelController = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ user: userId });

    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No transactions found" });
    }

    const transactionData = transactions.map((txn) => ({
      Title: txn.title,
      Amount: txn.amount,
      Category: txn.category,
      Type: txn.transactionType,
      Date: txn.date,
    }));

    const worksheet = XLSX.utils.json_to_sheet(transactionData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=transactions_${userId}.xlsx`
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });
    res.send(excelBuffer);
  } catch (err) {
    console.error("Excel Generation Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Error generating Excel file" });
  }
};
