import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();

    const {
      search,
      filter,
      sort,
      page = "1",
      limit = "9",
    } = Object.fromEntries(new URL(req.url).searchParams);

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    // Build query
    const query: any = { role: "student", status: "approved" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { university: { $regex: search, $options: "i" } },
        { course: { $regex: search, $options: "i" } },
      ];
    }

    if (filter === "urgent") {
      query.$expr = {
        $lt: [{ $divide: ["$raisedAmount", "$targetAmount"] }, 0.25],
      };
    } else if (filter === "nearly-funded") {
      query.$expr = {
        $gte: [{ $divide: ["$raisedAmount", "$targetAmount"] }, 0.75],
      };
    }

    // Sorting
    let sortOption: any = { createdAt: -1 }; // default: recent
    if (sort === "progress") {
      sortOption = { $expr: { $divide: ["$raisedAmount", "$targetAmount"] } };
    } else if (sort === "amount") {
      sortOption = { $expr: { $subtract: ["$targetAmount", "$raisedAmount"] } };
    }

    const total = await User.countDocuments(query);
    const students = await User.find(query)
      .sort(sortOption)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return NextResponse.json({
      success: true,
      students,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
        limit: pageSize,
      },
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
