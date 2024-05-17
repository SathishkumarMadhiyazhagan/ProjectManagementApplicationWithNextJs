import mongoose, {Schema} from "mongoose";

const createUserSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        dateOfBirth: String,
        role: String,
        mobileNumber: String,
        password: String,
        selectedProjectId: [{
            type: String,
        }],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models?.User || mongoose.model("User", createUserSchema);

export default User;