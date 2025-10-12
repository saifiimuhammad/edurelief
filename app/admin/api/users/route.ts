import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const students = await User.find({ role: "student" }).lean();
    const donors = await User.find({ role: "donor" }).lean();

    return NextResponse.json({
      success: true,
      students,
      donors,
    });
  } catch (err) {
    console.error("Donation Trends Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : String(err),
        error: err,
      },
      { status: 500 }
    );
  }
}
