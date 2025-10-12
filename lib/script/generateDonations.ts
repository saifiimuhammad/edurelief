import { User } from "@/models/User";
import { Donation } from "@/models/Donation";
import { Payment } from "@/models/Payment";
import { faker } from "@faker-js/faker";
import { connectDb } from "../db";

// --- Seeder Function ---
async function seedDonations(num = 50) {
  try {
    await connectDb();

    const donors = await User.find({ role: "donor" });
    const students = await User.find({ role: "student" });

    if (!donors.length || !students.length) {
      console.log(
        "No donors or students found in DB. Please create users first."
      );
      return;
    }

    const donations: any[] = [];
    const payments: any[] = [];

    for (let i = 0; i < num; i++) {
      const donor = donors[Math.floor(Math.random() * donors.length)];
      const student = students[Math.floor(Math.random() * students.length)];
      const amount = faker.number.int({ min: 100, max: 10000 });
      const paymentId = faker.string.uuid();
      const message = faker.lorem.sentence();
      const statusOptions = ["pending", "completed", "failed"];
      const paymentStatus =
        statusOptions[Math.floor(Math.random() * statusOptions.length)];

      // Donation document
      donations.push({
        donorId: donor._id,
        donorEmail: donor.email,
        studentId: student._id,
        amount,
        message,
        paymentId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Payment document
      payments.push({
        paymentId,
        amount,
        status: paymentStatus,
        donorId: donor._id,
        studentId: student._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert all at once
    await Donation.insertMany(donations);
    await Payment.insertMany(payments);

    console.log(`✅ Seeded ${num} donations and payments successfully!`);
  } catch (err) {
    console.error("❌ Seeder Error:", err);
  } finally {
    process.exit(0);
  }
}

// Run directly
seedDonations(25).catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
