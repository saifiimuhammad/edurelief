import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDb();

    const students = await User.find({
      role: "student",
      status: "approved",
      targetAmount: { $gt: 0 },
    }).lean();

    const almostCompleted = students
      .filter(
        (s) =>
          s.raisedAmount &&
          s.targetAmount &&
          s.raisedAmount / s.targetAmount >= 0.7
      )
      .sort(
        (a, b) =>
          b.raisedAmount / b.targetAmount - a.raisedAmount / a.targetAmount
      )
      .slice(0, 3);

    return NextResponse.json({
      success: true,
      message: "Featured students fetched successfully.",
      data: almostCompleted,
    });
  } catch (err: any) {
    console.error("❌ Featured Students Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
