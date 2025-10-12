import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

// ✅ GET /api/students/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;
    const student = await User.findOne({ studentId: id });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "No record found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, student });
  } catch (err: any) {
    console.error("❌ Internal Server Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

// ✅ PUT /api/students/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Student ID missing" },
        { status: 400 }
      );
    }

    // 🧱 Disallow editing certain fields
    const forbidden = [
      "role",
      "status",
      "raisedAmount",
      "_id",
      "__v",
      "createdAt",
      "updatedAt",
    ];
    forbidden.forEach((field) => delete data[field]);

    // 🔍 Find by studentId (not Mongo _id)
    const updatedStudent = await User.findOneAndUpdate(
      { studentId: id },
      data,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error: any) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/students/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Student ID missing" },
        { status: 400 }
      );
    }

    // 🔍 Delete by studentId (not _id)
    const deletedStudent = await User.findOneAndDelete({ studentId: id });

    if (!deletedStudent) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
