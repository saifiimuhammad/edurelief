import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";

// GET — Fetch donor by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();
    const donor = await User.findOne({ _id: params.id, role: "donor" });

    if (!donor) {
      return NextResponse.json(
        { success: false, message: "Donor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, donor });
  } catch (err: any) {
    console.error("❌ Donor GET Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

// POST — Update donor info (edit profile)
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();
    const body = await req.json();
    const { name, email, phone, address } = body;

    const donor = await User.findOneAndUpdate(
      { _id: params.id, role: "donor" },
      { name, email, phone, address },
      { new: true }
    );

    if (!donor) {
      return NextResponse.json(
        { success: false, message: "Donor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      donor,
    });
  } catch (err: any) {
    console.error("❌ Donor UPDATE Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

// DELETE — Remove donor profile
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const donor = await User.findOneAndDelete({
      _id: params.id,
      role: "donor",
    });

    if (!donor) {
      return NextResponse.json(
        { success: false, message: "Donor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Donor deleted successfully",
    });
  } catch (err: any) {
    console.error("❌ Donor DELETE Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
