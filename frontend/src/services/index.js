import api from "./api";

export const getExpenses =
  (month) =>
    api.get(
      "/expense-api/readExpenses",
      {
        params: {
          month,
        },
      }
    );

export const addExpense =
  (data) =>
    api.post(
      "/expense-api/addExpense",
      data
    );

export const deleteExpense =
  (id) =>
    api.delete(
      `/expense-api/deleteExpense/${id}`
    );

export const updateExpense =
  (id, data) =>
    api.put(
      `/expense-api/updateExpense/${id}`,
      data
    );

// ======================================================
// BUDGETS
// ======================================================

export const getBudgets =
  (month) =>
    api.get(
      "/budget-api/checklimit",
      {
        params: {
          month,
        },
      }
    );

export const addBudget =
  (data) =>
    api.post(
      "/budget-api/addlimit",
      data
    );

export const updateBudget =
  (id, data) =>
    api.put(
      `/budget-api/editlimit/${id}`,
      data
    );

export const deleteBudget =
  (id) =>
    api.delete(
      `/budget-api/deletelimit/${id}`
    );

// ======================================================
// ALERTS
// ======================================================

export const getAlerts =
  (month) =>
    api.get(
      "/alert-api/budgetAlert",
      {
        params: {
          month,
        },
      }
    );

export const getSavingsAlert =
  (month) =>
    api.get(
      "/alert-api/savingsAlert",
      {
        params: {
          month,
        },
      }
    );

// ======================================================
// INSIGHTS
// ======================================================

export const getInsights =
  (month) =>
    api.get(
      "/insight-api/getInsights",
      {
        params: {
          month,
        },
      }
    );

// ======================================================
// RECEIPT SCANNER
// ======================================================

export const scanReceipt =
  (file) => {

    const formData =
      new FormData();

    formData.append(
      "receipt",
      file
    );

    return api.post(
      "/receipt-api/scan",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

// ======================================================
// AI PREDICTION
// ======================================================

export const getNextMonthPrediction =
  (month) =>
    api.get(
      "/prediction-api/nextMonth",
      {
        params: {
          month,
        },
      }
    );

// ======================================================
// REPORTS
// ======================================================

export const exportExpenseReport =
  (month) =>
    api.get(
      "/report-api/export",
      {
        params: {
          month,
        },

        responseType:
          "blob",
      }
    );

// ======================================================
// INCOME
// ======================================================

export const getIncome =
  (month) =>
    api.get(
      "/income-api/readIncome",
      {
        params: {
          month,
        },
      }
    );

export const addIncomeApi =
  (data) =>
    api.post(
      "/income-api/addIncome",
      data
    );

export const updateIncomeApi =
  (data) =>
    api.put(
      "/income-api/updateIncome",
      data
    );

// ======================================================
// SAVINGS
// ======================================================

export const getSavings =
  (month) =>
    api.get(
      "/saving-api/get-savings",
      {
        params: {
          month,
        },
      }
    );

export const getSavingsGoal =
  (month) =>
    api.get(
      "/saving-api/goal",
      {
        params: {
          month,
        },
      }
    );

export const saveSavingsGoal =
  (data) =>
    api.post(
      "/saving-api/goal",
      data
    );

export const deleteSavingsGoal =
  (month) =>
    api.delete(
      "/saving-api/goal",
      {
        params: {
          month,
        },
      }
    );

    export const addBudgetLimit =
  (data) =>
    api.post(
      "/budget-api/addlimit",
      data
    );

export const getBudgetLimits =
  (month) =>
    api.get(
      "/budget-api/checklimit",
      {
        params: {
          month,
        },
      }
    );

export const deleteBudgetLimit =
  (id) =>
    api.delete(
      `/budget-api/deletelimit/${id}`
    );