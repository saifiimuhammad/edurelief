import mongoose,{ Schema, models, model, Document, Model } from "mongoose";

interface DonationDoc extends Document {
  donorId: mongoose.Types.ObjectId;
  donorEmail: string;
  studentId: mongoose.Types.ObjectId;
  amount: number;
  message?: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<DonationDoc>(
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

// Type-safe model export
export const Donation: Model<DonationDoc> =
  (models.Donation as Model<DonationDoc>) ||
  model<DonationDoc>("Donation", donationSchema);
