import connectMongoDB from "@/utils/mongodb";
import User from "@/models/createUserSchema";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const user = await User.find({role: 'admin'}).sort({ createdAt: -1 });
    return NextResponse.json({user});
}