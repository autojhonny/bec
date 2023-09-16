import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Post from "@/models/post";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const user = await User.create({ name, email, password: hashedPassword });
    const post = await Post.create({
      Engage: {
        Kickoff: true,
        "Scoping call": true,
        "Sow Signed": true,
        "MSA Signed": true,
        "Request GA Creds": true
      },
      Containment: {
        "Disable Compromised User": true,
        "Reset Passwords": true,
        "Revoke Active Sessions": true,
        "Force MFA": true
      },
      user: user._id
    });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
