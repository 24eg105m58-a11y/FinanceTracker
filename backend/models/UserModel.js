import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is mandatory"],
      trim: true,
    },

    Mob_num: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    isUserActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  }
);

export const UserModel = model("user", UserSchema);