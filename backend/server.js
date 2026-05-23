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

app.set("trust proxy", 1);

// ======================================================
// CORS CONFIG
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://finance-tracker-seven-lake.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {

      // ALLOW POSTMAN / MOBILE APPS
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(exp.json());

// ======================================================
// ROUTES
// ======================================================
app.use("/user-api", userApp);
app.use("/income-api", incomeApp);
app.use("/expense-api", expenseApp);
app.use("/savings-api", savingsApp);
app.use("/budget-api", budApp);
app.use("/alert-api", totalApp);
app.use("/insight-api", insightsApp);
app.use("/receipt-api", receiptApp);
app.use("/prediction-api", predictionApp);
app.use("/report-api", reportApp);

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.send("Finance Tracker Backend Running");
});

// ======================================================
// DATABASE CONNECTION
// ======================================================

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

// ======================================================
// ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {

  console.log(err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS blocked this request",
    });
  }

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