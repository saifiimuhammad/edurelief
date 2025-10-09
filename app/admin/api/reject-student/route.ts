import { NextResponse } from "next/server";
import { connectDB, StudentModel } from "@/lib/database";

export async function POST(req: Request) {
  const { id } = await req.json();
  await connectDB();

  await StudentModel.findByIdAndUpdate(id, { status: "rejected" });
  return NextResponse.json({ message: "Student rejected" });
}
