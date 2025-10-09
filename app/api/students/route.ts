import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const students = await User.find({
      role: "student",
      status: "approved",
    }).sort({ createdAt: -1 }); // ✅ Correct place for sorting

    if (!students || students.length === 0) {
      return NextResponse.json(
        { success: false, message: "No students found" },
        { status: 404 }
      );
    }
    console.log(students);

    return NextResponse.json({
      success: true,
      students,
    });
  } catch (err: any) {
    console.error("❌ Internal Server Error:", err.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
