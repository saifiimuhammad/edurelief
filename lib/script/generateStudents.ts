import { faker } from "@faker-js/faker";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User"; // Assuming User model is in models/User

async function seedStudents(count = 20) {
  await connectDb();
  console.log(`🌱 Seeding ${count} random students...`);

  const universities = [
    "University of Karachi",
    "FAST NUCES",
    "LUMS",
    "IBA Karachi",
    "UET Lahore",
    "COMSATS Islamabad",
  ];

  const courses = [
    "Computer Science",
    "Software Engineering",
    "Electrical Engineering",
    "Business Administration",
    "Data Science",
    "AI & Robotics",
  ];

  const students = Array.from({ length: count }).map(() => {
    const targetAmount = faker.number.int({ min: 20000, max: 200000 });
    const raisedAmount = faker.number.int({ min: 0, max: targetAmount - 5000 });

    return {
      // Required fields
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      role: "student",

      // Optional
      profileImage: faker.image.avatar(),
      phone: faker.phone.number({ style: "international" }),
      address: faker.location.streetAddress(),

      // Student-specific
      studentId: faker.string.uuid(),
      university: faker.helpers.arrayElement(universities),
      course: faker.helpers.arrayElement(courses),
      semester: `Semester ${faker.number.int({ min: 1, max: 8 })}`,
      targetAmount,
      raisedAmount,
      story: faker.lorem.paragraphs(2),

      // CNIC format like Pakistani: 42101-1234567-1
      cnic: `${faker.number.int({ min: 10000, max: 99999 })}-${faker.number.int(
        {
          min: 1000000,
          max: 9999999,
        }
      )}-${faker.number.int({ min: 1, max: 9 })}`,

      father_cnic: `${faker.number.int({
        min: 10000,
        max: 99999,
      })}-${faker.number.int({
        min: 1000000,
        max: 9999999,
      })}-${faker.number.int({ min: 1, max: 9 })}`,

      // Fake document URLs
      utility_bill: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
      income_proof: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),

      // Status
      status: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
    };
  });

  await User.insertMany(students);

  console.log(`✅ Successfully seeded ${count} random students!`);
  process.exit(0);
}

// Run directly
seedStudents(25).catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
