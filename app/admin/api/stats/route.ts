import { NextResponse } from "next/server";
import { connectDB, StudentModel, DonationModel } from "@/lib/database";

export async function GET() {
  await connectDB();
  console.log("connected");
  const totalStudents = await StudentModel.countDocuments();
  const totalDonations = await DonationModel.countDocuments();
  console.log("students & donations", totalStudents, totalDonations);

  const allDonations = await DonationModel.find();

  const totalRaised = allDonations.reduce((sum, d) => sum + d.amount, 0);

  console.log("fgdgd");
  return NextResponse.json({ totalStudents, totalDonations, totalRaised });
}
