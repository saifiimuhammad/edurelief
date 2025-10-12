import { connectDb } from "@/lib/db";
import { Donation } from "@/models/Donation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const donations = await Donation.find().lean();

    return NextResponse.json({
      success: true,
      donations,
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
