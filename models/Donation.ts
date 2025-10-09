import { Schema, models, model } from "mongoose";

const schema = new Schema(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donorEmail: { type: String, required: true },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    message: String,
    paymentId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Donation = models.Donation || model("Donation", schema);
