import { model, Schema } from "mongoose";

const ReceiptSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    receiptUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
    },

    merchant: {
      type: String,
      default: "",
      trim: true,
    },

    amount: {
      type: Number,
      default: 0,
      min: [0, "Amount cannot be negative"],
    },

    category: {
      type: String,
      default: "others",
      lowercase: true,
      trim: true,
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },
items: {
  type: [
    {
      name: {
        type: String,
        default: "",
      },

      quantity: {
        type: Number,
        default: 1,
      },

      price: {
        type: Number,
        default: 0,
      },
    },
  ],

  default: [],
},

    rawAiResult: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ReceiptModel = model("receipt", ReceiptSchema);