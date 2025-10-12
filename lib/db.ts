import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://iamsaad201_db_user:itsmesaif786@mycluster.2kdijqg.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";

if (!MONGODB_URI) throw new Error("⚠️ MONGODB_URI is not defined!");

let isConnected = false;

export async function connectDb() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: "edufund",
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}
