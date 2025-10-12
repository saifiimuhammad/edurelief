import { uploadToCloudinary } from "@/lib/cloudinary";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    await connectDb();
    console.log("Db connected");
    const formData = await req.formData();

    // Basic fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as string) || "student";

    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const university = formData.get("university") as string;
    const course = formData.get("course") as string;
    const semester = formData.get("semester") as string;
    const targetAmount = Number(formData.get("targetAmount"));
    const story = formData.get("story") as string;

    // Files
    const cnicFile = formData.get("cnic") as File | null;
    const fatherCnicFile = formData.get("father_cnic") as File | null;
    const utilityBillFile = formData.get("utility_bill") as File | null;
    const incomeProofFile = formData.get("income_proof") as File | null;
    const profileImageFile = formData.get("profileImage") as File | null;

    console.log("form data collected");

    if (!name || !email || !password)
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );

    console.log("checked existing data");

    const uploadIfExists = (file: File | null) =>
      file ? uploadToCloudinary(file) : Promise.resolve(null);

    const [
      cnicUrl,
      fatherCnicUrl,
      utilityBillUrl,
      incomeProofUrl,
      profileImageUrl,
    ] = await Promise.all([
      uploadIfExists(cnicFile),
      uploadIfExists(fatherCnicFile),
      uploadIfExists(utilityBillFile),
      uploadIfExists(incomeProofFile),
      uploadIfExists(profileImageFile),
    ]);

    console.log("files uploaded to cloudinary");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("password hased");
    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      studentId: `stud-${uuidv4()}`,
      role,
      phone,
      address,
      university,
      course,
      semester,
      targetAmount,
      story,
      cnic: cnicUrl,
      father_cnic: fatherCnicUrl,
      utility_bill: utilityBillUrl,
      income_proof: incomeProofUrl,
      profileImage: profileImageUrl,
      raisedAmount: 0,
      status: role === "student" ? "pending" : "approved",
    });
    console.log("usser creeated");

    return NextResponse.json(
      { success: true, message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ Register API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
