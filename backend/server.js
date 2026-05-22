import exp from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import { userApp } from "./APIs/UserAPI.js";
import { incomeApp } from "./APIs/IncomeAPI.js";
import { savingsApp } from "./APIs/SavingsAPI.js";
import { expenseApp } from "./APIs/ExpenseAPI.js";
import { budApp } from "./APIs/BudgetAPI.js";
import { totalApp } from "./APIs/AlertAPI.js";
import { insightsApp } from "./APIs/InsightAPI.js";
import { receiptApp } from "./APIs/ReceiptAPI.js";
import { predictionApp } from "./APIs/PredictionAPI.js";
import { reportApp } from "./APIs/ReportAPI.js";

config();

const app = exp();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(exp.json());



app.use("/api/user-api", userApp);

app.use("/api/income-api", incomeApp);

app.use("/api/expense-api", expenseApp);

app.use("/api/saving-api", savingsApp);

app.use("/api/budget-api", budApp);

app.use("/api/alert-api", totalApp);

app.use("/api/insight-api", insightsApp);

app.use("/api/receipt-api", receiptApp);

app.use("/api/prediction-api", predictionApp);

app.use("/api/report-api", reportApp);

// DATABASE CONNECTION

const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);

    console.log(
      "Connected to DB server"
    );

    const port =
      process.env.PORT || 4000;

    app.listen(port, () =>
      console.log(
        `Server listening on port ${port}`
      )
    );
  } catch (err) {
    console.log(
      "Error in DB connection",
      err
    );
  }
};

connectDB();

// Error handling middleware


app.use((err, req, res, next) => {

  console.log(err);

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message:
        "File size must be less than 2MB",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message:
        "Duplicate value already exists",
    });
  }

  res.status(500).json({
    message: "Server side error",
  });
});