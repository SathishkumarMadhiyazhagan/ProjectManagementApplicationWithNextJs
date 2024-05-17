import connectMongoDB from "@/utils/mongodb";
import Project from "@/models/createProjectSchema";
import { NextResponse } from "next/server";
import formidable from "formidable";
import {IncomingForm} from 'formidable'

// export const config = {
//     api: {
//       bodyParser: false,
//     },
// }
export async function POST(request) {
    try {
        // const reader = req.body.getReader();
        // const { projectid, projectname, startdate, enddate,
        //      projecttype, projectsbu, projectmanager } = await reader.read();
    
        // const newUser = {
        //     projectid, projectname, startdate, enddate,
        //     projecttype, projectsbu, projectmanager,
        //   projectfile: req.file.path, // Save the path to the uploaded image
        // };
        const {projectid, projectname, startdate, enddate,
            projecttype, projectsbu, projectmanager, projectfile}= await request.json()
        await connectMongoDB();

        const existingProject = await Project.findOne({ projectid });

        if (existingProject) {
          return NextResponse.json({ error: 'Project id already exists' }, {status: 400});
        }
    
        await Project.create({projectid, projectname, startdate, enddate,
            projecttype, projectsbu, projectmanager, projectfile});
    
            return NextResponse.json({ message: "Project Created"}, {status: 201});
      } catch (error) {
        return NextResponse.json({ message: "Project Created Failed"}, {status: 500});
      }
    // const form = formidable({});
    // form.parse(req, async (err, fields, files) => {
    //     if (err) {
    //         return NextResponse.json({ message: "File parsing error"}, {status: 500});
    //     }
    //     console.log(req);
    //     const {projectid, projectname, startdate, enddate, projecttype,
    //         projectsbu, projectmanager} = fields;
    //     const projectfile = files.filename;
    //     console.log("hello"+projectfile)
    //     try {
    //         await Project.create({projectid, projectname, startdate, enddate, projecttype,
    //             projectsbu, projectmanager, projectfile})
    //         return NextResponse.json({ message: "Project Created"}, {status: 201});
    //     } catch(e) {
    //         return NextResponse.json({ message: "Project Created Failed"}, {status: 500});
    //     }
    // })
    // const {projectid, projectname, startdate, enddate, projecttype,
    //     projectsbu, projectmanager, projectfile} = await request.body();
    // const data = await request.body();
    // await connectMongoDB();
    // await Project.create(data);
    // return NextResponse.json({ message: "User Created"}, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const project = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({project});
}