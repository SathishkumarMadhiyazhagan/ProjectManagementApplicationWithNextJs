import connectMongoDB from "@/utils/mongodb";
import User from "@/models/createUserSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {firstName, lastName, email, dateOfBirth, role,
         mobileNumber, password, selectedProjectId = []} = await request.json();
    await connectMongoDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, {status: 400});
    }
    await User.create({ firstName, lastName, email, dateOfBirth, role,
         mobileNumber, password, selectedProjectId});
    return NextResponse.json({ message: "User Created"}, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const user = await User.find({role: 'user'}).sort({ createdAt: -1 });
    return NextResponse.json({user});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({message: "User deleted"}, {status: 201})
}