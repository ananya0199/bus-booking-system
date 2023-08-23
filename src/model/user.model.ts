import { model, Schema } from "mongoose";
import bcrpyt from "bcryptjs";

const UserType = {
    USER: 'user',
    ADMIN: 'admin'
};
const UserRole = {
    ADMIN: 'admin',
    USER: 'user'
};


const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        user_type: {
            type: String,
            enum: Object.values(UserType)
        },
        role: {
            type: String,
            enum: Object.values(UserRole)
        },
    },
    { timestamps: true },
);
export const hashPassword = async (password: any) => {
    const salt = await bcrpyt.genSalt(12);
    const passwordHash = await bcrpyt.hash(password, salt);
    return passwordHash;
};
userSchema.methods.generateAuth = async () => { };
export const User = model("User", userSchema);