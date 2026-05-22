import { model, Schema } from "mongoose";

const BudgetMod = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    category: {
      type: String,
      required: [true, "Category is mandatory"],
      lowercase: true,
      trim: true,
    },

    limit: {
      type: Number,
      required: [true, "Kindly set a limit for this category"],
        min: [1, "Limit must be greater than 0"],
    },

    month: {
      type: Date,
      required: true,
      default: () =>
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1,
          0,
          0,
          0,
          0
        ),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BudgetMod.index(
  {
    userId: 1,
    category: 1,
    month: 1,
  },
  {
    unique: true,
  }
);

export const BudgetModel = model("budget", BudgetMod);