import clientPromise from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const client = await clientPromise
    const db= client.db('test')
    const collection= db.collection('users')
    const { email } = await req.json();
    const user = await collection.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
