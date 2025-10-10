// app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectDb();

    // Find user
    const user = await User.findOne({ email }).select("+password");
    console.log(user.password);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "supersecretkey",
      { expiresIn: "7d" }
    );

    // Return user info (without password)
    const { password: _, ...userData } = user._doc;

    console.log(true, "login successfull", token, userData);

    return NextResponse.json({
      success: true,
      message: "Login successful.",
      token,
      user: userData,
    });
  } catch (err: any) {
    console.error("❌ Login API Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
