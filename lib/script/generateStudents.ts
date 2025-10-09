import { faker } from "@faker-js/faker";
import { connectDB, StudentModel } from "../database";

async function seedStudents(count = 20) {
  await connectDB();

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
      studentId: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      university: faker.helpers.arrayElement(universities),
      course: faker.helpers.arrayElement(courses),
      semester: `Semester ${faker.number.int({ min: 1, max: 8 })}`,
      targetAmount,
      raisedAmount,
      story: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
      profileImage: faker.image.avatar(),
    };
  });

  await StudentModel.insertMany(students);

  console.log("✅ Successfully seeded random students!");
  process.exit(0);
}

seedStudents(25).catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
