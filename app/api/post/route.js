import clientPromise from "@/lib/new";
// import User from "@/models/user";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { getSession } from "next-auth/react";

export async function POST(req) {
  const ss= await getServerSession(authOptions)
const session = await getSession(req);

  // const data = req.session
  console.log(session,ss);
  try {
    const client = await clientPromise
    const db= client.db('test')
    const { email } = await req.json();
    const user = await db.collection('users').findOne({ email:email });
    console.log(user,"from postdata")
    const post = await db.collection('posts').findOne({ user:user._id }).toArray();
    console.log(json(post));
    // post.json(movies);
    console.log("user: ", user);
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
    { message: "An error occurred while fetching.",error },
    { status: 500 }
  );
  }
}
