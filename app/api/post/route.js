import clientPromise from "@/lib/new";
// import User from "@/models/user";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
export async function POST(req) {
  const session = await getServerSession(authOptions)
  // const {email} = session.user.email
  // console.log(email,session);
  const data = req.body;
  console.log("inside post route",data);
  try {
    const client = await clientPromise
    const db= client.db('test')
    const { email } = await req.json();
    const user = await db.collection('users').findOne({ email: email });
    console.log(user._id,"from postdata")
    const post = await db.collection('posts').findOne({"user": user._id });
    // console.log(post);
    // console.log("user: ", user);
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
    { message: "An error occurred while fetching.",error },
    { status: 500 }
  );
  }
}
