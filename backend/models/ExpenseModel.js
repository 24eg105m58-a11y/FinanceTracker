import { model, Schema } from "mongoose";

const expenseMod = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    amount: {
      type: Number,
      required: [true, "Kindly add amount to add expense"],
      min: [0, "Amount cannot be negative"],
    },

    item: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: [true, "Kindly add a category"],
      lowercase: true,
      trim: true,
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

expenseMod.index({
  userId: 1,
  expenseDate: 1,
});

export const expenseModel = model("expense", expenseMod);