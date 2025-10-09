import { Schema, model, models } from "mongoose";

const schema = new Schema(
  {
    // Common fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional if using social login
    role: {
      type: String,
      enum: ["student", "donor", "admin"],
      default: "student",
    },

    // Common optional fields
    profileImage: { type: String },
    phone: { type: String },
    address: { type: String },

    // Student-specific fields
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

    // Status (for student approval)
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// optional virtuals for role-based checks
schema.methods.isAdmin = function () {
  return this.role === "admin";
};

export const User = models.User || model("User", schema);
