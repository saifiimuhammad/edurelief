import { Schema, model, models, Document, Model } from "mongoose";

// Define interface for User document
interface UserDoc extends Document {
  name: string;
  email: string;
  password?: string;
  role: "student" | "donor" | "admin";
  profileImage?: string;
  phone?: string;
  address?: string;
  studentId?: string;
  university?: string;
  course?: string;
  semester?: string;
  targetAmount?: number;
  raisedAmount?: number;
  story?: string;
  cnic?: string;
  father_cnic?: string;
  utility_bill?: string;
  income_proof?: string;
  status: "pending" | "approved" | "rejected";
  isAdmin: () => boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ["student", "donor", "admin"],
      default: "student",
    },
    profileImage: { type: String },
    phone: { type: String },
    address: { type: String },
    studentId: { type: String },
    university: { type: String },
    course: { type: String },
    semester: { type: String },
    targetAmount: { type: Number },
    raisedAmount: { type: Number, default: 0 },
    story: { type: String },
    cnic: { type: String },
    father_cnic: { type: String },
    utility_bill: { type: String },
    income_proof: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};

// Type-safe model export
export const User: Model<UserDoc> =
  (models.User as Model<UserDoc>) || model<UserDoc>("User", userSchema);
