// import { connectMongoDB } from "@/lib/mongodb";
import clientPromise from "@/lib/new";
import User from "@/models/user";
import Post from "@/models/post";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise
    const db= client.db('test')
    const collection= db.collection('users')
    const insertedUser = await collection.insertOne({  name, email, password:hashedPassword });
    // console.log(insertedUser,"user created");
    // console.log(insertedUser.insertedId);
    // const user = await User.create({ name, email, password: hashedPassword });
    const postsCollection = db.collection('posts');

    await postsCollection.insertOne({
      data:{
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
          user: insertedUser.insertedId
        }
      })
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
