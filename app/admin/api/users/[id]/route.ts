import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

// PUT — update any field
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();
    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("❌ PUT /admin/api/user Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

// DELETE — remove user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const deletedUser = await User.findByIdAndDelete(params.id);
    if (!deletedUser)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("❌ DELETE /admin/api/user Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
