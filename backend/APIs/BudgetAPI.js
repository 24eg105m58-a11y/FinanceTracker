import exp from "express";
import { BudgetModel } from "../models/BudgetModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const budApp = exp.Router();

// GET MONTH START
const getMonthStart = (value) => {
  const date = value ? new Date(value) : new Date();

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
};


// ADD LIMIT
budApp.post("/addlimit", verifyToken, async (req, res) => {
  try {
    const limit = Number(req.body.limit);

    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({
        message: "Limit must be greater than 0",
      });
    }

    const month = getMonthStart(req.body.month);

    const category = String(req.body.category || "others")
      .trim()
      .toLowerCase();

    const budget = await BudgetModel.findOneAndUpdate(
      {
        userId: req.user.id,
        category,
        month,
      },
      {
        $set: {
          category,
          limit,
          month,
        },
      },
      {
          returnDocument: "after",
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Limit saved",
      payload: budget,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// CHECK LIMIT

budApp.get("/checklimit", verifyToken, async (req, res) => {
  try {
    const selectedMonth = getMonthStart(req.query.month);

    const monthEnd = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      1
    );

    const budgets = await BudgetModel.find({
      userId: req.user.id,
      month: {
        $gte: selectedMonth,
        $lt: monthEnd,
      },
    }).sort({ category: 1 });

    res.status(200).json({
      message: "Limits",
      payload: budgets,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// EDIT LIMIT

budApp.put("/editlimit/:id", verifyToken, async (req, res) => {
  try {
    const limit = Number(req.body.limit);

    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({
        message: "Limit must be greater than 0",
      });
    }

    const category = String(req.body.category || "others")
      .trim()
      .toLowerCase();

    const updateBudget = await BudgetModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        $set: {
          limit,
          category,
        },
      },
      {
           returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updateBudget) {
      return res.status(404).json({
        message: "Could not edit limit",
      });
    }

    res.status(200).json({
      message: "Updated Limit",
      payload: updateBudget,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// DELETE LIMIT

budApp.delete("/deletelimit/:id", verifyToken, async (req, res) => {
  try {
    const deletedBudget = await BudgetModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedBudget) {
      return res.status(404).json({
        message: "Limit not found",
      });
    }

    res.status(200).json({
      message: "Limit deleted",
      payload: deletedBudget,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});