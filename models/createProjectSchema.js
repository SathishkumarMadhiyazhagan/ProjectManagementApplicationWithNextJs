import mongoose, {Schema} from "mongoose";

const createProjectSchema = new Schema(
    {
        projectid: String,
        projectname: String,
        startdate: String,
        enddate: String,
        projecttype: String,
        projectsbu: String,
        projectmanager: String,
        projectfile: String
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.models.Project || mongoose.model("Project", createProjectSchema);

export default Project;