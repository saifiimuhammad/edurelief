import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await connectDb();

    const student = await User.findOne({ studentId: id }); // ✅ Use findOne

    if (!student) {
      return NextResponse.json(
        { success: false, message: "No record found" },
        { status: 404 }
      );
    }
    console.log(student);
    return NextResponse.json({
      success: true,
      student,
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
