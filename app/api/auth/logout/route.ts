import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Logout hogya bc");
    return NextResponse.json({
      success: true,
      message: "Logout successful.",
    });
  } catch (err: any) {
    console.error("❌ Logout Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
