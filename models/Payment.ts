import { Schema, models, model } from "mongoose";

const schema = new Schema(
  {
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Payment = models.Payment || model("Payment", schema);
