import { connectDb } from "@/lib/db";
import { Donation } from "@/models/Donation";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    console.log("DB connected");

    // Basic stats
    const totalStudents = await User.countDocuments({ role: "student" });
    const approvedStudents = await User.countDocuments({
      role: "student",
      status: "approved",
    });
    const pendingStudents = await User.countDocuments({
      role: "student",
      status: "pending",
    });
    const rejectedStudents = await User.countDocuments({
      role: "student",
      status: "rejected",
    });
    const totalDonations = await Donation.countDocuments();
    const allDonations = await Donation.find();

    const raisedDonations = allDonations.reduce(
      (sum, d) => sum + Number(d.amount),
      0
    );
    const avgDonation = totalStudents > 0 ? raisedDonations / totalStudents : 0;

    // --- Top Donors ---
    // Aggregate donations by donorId, sort by total amount descending, limit 5
    const topDonorsAgg = await Donation.aggregate([
      { $group: { _id: "$donorId", totalDonated: { $sum: "$amount" } } },
      { $sort: { totalDonated: -1 } },
      { $limit: 5 },
    ]);

    // Populate donor info
    const topDonors = await User.find({
      _id: { $in: topDonorsAgg.map((d) => d._id) },
    });
    const topDonorsFinal = topDonorsAgg.map((d) => {
      const user = topDonors.find((u) => u._id.equals(d._id));
      return {
        donorId: d._id,
        name: user?.name || "Unknown",
        email: user?.email || "Unknown",
        totalDonated: d.totalDonated,
      };
    });

    // --- Top Students ---
    // Assuming "donations to students" are tracked by a "studentId" in Donation schema
    const topStudentsAgg = await Donation.aggregate([
      { $group: { _id: "$studentId", totalReceived: { $sum: "$amount" } } },
      { $sort: { totalReceived: -1 } },
      { $limit: 5 },
    ]);

    const topStudents = await User.find({
      _id: { $in: topStudentsAgg.map((d) => d._id) },
    });
    const topStudentsFinal = topStudentsAgg.map((d) => {
      const student = topStudents.find((u) => u._id.equals(d._id));
      return {
        studentId: d._id,
        name: student?.name || "Unknown",
        email: student?.email || "Unknown",
        totalReceived: d.totalReceived,
      };
    });

    const stats = {
      students: {
        total: totalStudents,
        approved: approvedStudents,
        pending: pendingStudents,
        rejected: rejectedStudents,
        top: topStudentsFinal,
      },
      donations: {
        total: totalDonations,
        raised: raisedDonations,
        average: avgDonation,
        topDonors: topDonorsFinal,
      },
    };

    return NextResponse.json({ success: true, stats });
  } catch (err) {
    console.error("Internal Server Error:", err);
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
