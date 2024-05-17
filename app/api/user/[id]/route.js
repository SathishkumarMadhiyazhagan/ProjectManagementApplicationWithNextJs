import connectMongoDB from "@/utils/mongodb";
import User from "@/models/createUserSchema";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const {firstName, lastName, email, dateOfBirth, role, mobileNumber, password} = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {firstName, lastName, email, dateOfBirth, role, mobileNumber, password});
    return NextResponse.json({message: "User updated"}, {status:200});
}

export async function GET({params}) {
    const id = params;
    await connectMongoDB();
    const user = await User.findById(id);
    return NextResponse.json({ user }, {status:200});

}