import connectMongoDB from "@/utils/mongodb";
import Project from "@/models/createProjectSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { ids } = await request.json(); // Array of IDs passed in the request body
        console.log(ids);
        await connectMongoDB(); // Connect to your MongoDB database
        // if (!ids || !Array.isArray(ids)) {
        //     return NextResponse.json({ message: 'Invalid or missing ID array' }, {status: 400});
        // }
    
        const project = await Project.find({ _id: { $in: ids } }); // Fetch details based on IDs
    
        return NextResponse.json({project});
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error"}, {status: 500});
    }
}