import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, userName } = await request.json();

    if (!email || !password || !userName) {
      return NextResponse.json(
        { error: "All fields are required " },
        { status: 400 }
      );
    }

    await connectToDB();

    const existingUser = await User.findOne({ email: email }).lean();
    // console.log("❌ ", existingUser);
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 400 }
      );
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      userName,
      password,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("User registration failed", error);
    return NextResponse.json(
      { message: "User registration failed" },
      { status: 500 }
    );
  }
}
