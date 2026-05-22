import { Schema, model } from "mongoose";

const savingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    savingsGoal: {
      type: Number,
      required: true,
      min: [0, "Savings goal cannot be negative"],
    },

    month: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  }
);

savingsSchema.index(
  {
    userId: 1,
    month: 1,
  },
  {
    unique: true,
  }
);

export const savingsModel = model("savings", savingsSchema);