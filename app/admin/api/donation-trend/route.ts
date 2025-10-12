import { connectDb } from "@/lib/db";
import { Donation } from "@/models/Donation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const trends = await Donation.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Format to { month: "Jan 2025", amount: 12000 }
    const formattedTrends = trends.map((t) => {
      const date = new Date(t._id.year, t._id.month - 1);
      const monthName = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      return {
        month: monthName,
        amount: t.totalAmount,
      };
    });

    return NextResponse.json({
      success: true,
      donationTrends: formattedTrends,
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
