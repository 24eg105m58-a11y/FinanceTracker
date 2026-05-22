
import { Schema, model } from "mongoose";

const incomeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    income: {
      type: Number,
      required: [true, "Income is Mandatory"],
      min: [0, "Income cannot be negative"],
    },

    incomeDate: {
      type: Date,
      default: Date.now,
    },

    month: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  }
);

incomeSchema.index(
  {
    userId: 1,
    month: 1,
  },
  {
    unique: true,
  }
);

export const incomeModel = model("income", incomeSchema);