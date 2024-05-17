import connectMongoDB from "@/utils/mongodb";
import User from "@/models/createUserSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {email, password} = await request.json();
        await connectMongoDB();
        const user = await User.findOne({ email });

        if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, {status: 401});
        }

        // Validate password
        //const isPasswordValid = await user.comparePassword(password);

        if (password !== user.password) {
        return NextResponse.json({ message: 'Invalid credentials' }, {status: 401});
        }
        return NextResponse.json({user, message: 'Login Successfully'}, {status: 201});
    } catch(error) {
        return NextResponse.json({ message: 'Method Not Allowed' }, {status: 405});   
    }
}