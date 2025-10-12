import mongoose, { Schema, models, model, Document, Model } from "mongoose";

// Define interface for Payment document
interface PaymentDoc extends Document {
  paymentId: string;
  amount: number;
  status: string;
  donorId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<PaymentDoc>(
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

// Type-safe export
export const Payment: Model<PaymentDoc> =
  (models.Payment as Model<PaymentDoc>) ||
  model<PaymentDoc>("Payment", paymentSchema);
