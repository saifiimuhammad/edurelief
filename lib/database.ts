import mongoose, { Schema, model, models, Document } from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/edurelief";

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not defined in environment variables");
}

// --- Reusable connection helper ---
let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

// --- Interfaces ---
export interface StudentRequest extends Document {
  studentId: string;
  name: string;
  email: string;
  university: string;
  course: string;
  semester: string;
  targetAmount: number;
  raisedAmount: number;
  story: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  profileImage?: string;
}

export interface Donation extends Document {
  donorEmail: string;
  studentId: string;
  amount: number;
  message?: string;
  createdAt: Date;
  paymentId: string;
}

export interface User extends Document {
  email: string;
  name: string;
  role: "student" | "donor" | "admin";
  createdAt: Date;
}

// --- Schemas ---
const StudentSchema = new Schema<StudentRequest>({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  university: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  story: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  profileImage: String,
  createdAt: { type: Date, default: Date.now },
});

const DonationSchema = new Schema<Donation>({
  donorEmail: { type: String, required: true },
  studentId: { type: String, required: true },
  amount: { type: Number, required: true },
  message: String,
  paymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["student", "donor", "admin"], required: true },
  createdAt: { type: Date, default: Date.now },
});

// --- Models (safe check) ---
export const StudentModel =
  models?.Student || model<StudentRequest>("Student", StudentSchema);
export const DonationModel =
  models?.Donation || model<Donation>("Donation", DonationSchema);
export const UserModel = models?.User || model<User>("User", UserSchema);

// --- Database Class (MongoDB-backed) ---
export class Database {
  static async getStudents(status?: string): Promise<StudentRequest[]> {
    await connectDB();
    return status
      ? await StudentModel.find({ status })
      : await StudentModel.find();
  }

  static async getStudentById(id: string): Promise<StudentRequest | null> {
    await connectDB();
    return await StudentModel.findById(id);
  }

  static async addStudent(
    student: Omit<StudentRequest, "createdAt" | "_id">
  ): Promise<StudentRequest> {
    await connectDB();
    return await StudentModel.create(student);
  }

  static async updateStudent(
    id: string,
    updates: Partial<StudentRequest>
  ): Promise<StudentRequest | null> {
    await connectDB();
    return await StudentModel.findByIdAndUpdate(id, updates, { new: true });
  }

  static async getDonationsByStudent(studentId: string): Promise<Donation[]> {
    await connectDB();
    return await DonationModel.find({ studentId });
  }

  static async addDonation(
    donation: Omit<Donation, "createdAt" | "_id">
  ): Promise<Donation> {
    const newDonation = await DonationModel.create(donation);

    await connectDB();
    // Update raisedAmount of student
    await StudentModel.findOneAndUpdate(
      { _id: donation.studentId },
      { $inc: { raisedAmount: donation.amount } }
    );

    return newDonation;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    await connectDB();
    return await UserModel.findOne({ email });
  }

  static async addUser(user: Omit<User, "createdAt" | "_id">): Promise<User> {
    await connectDB();
    return await UserModel.create(user);
  }
}
