import { connectDb } from "@/lib/db";
import { Donation } from "@/models/Donation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    console.log("DB connected ✅");

    const recentDonations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("donorId", "name")
      .populate("studentId", "name")
      .lean();

    return NextResponse.json({
      success: true,
      recentDonations,
    });
  } catch (err) {
    console.error("Internal Server Error:", err);
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
