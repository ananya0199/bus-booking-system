import jwt from "jsonwebtoken";
import bcrpyt from "bcryptjs";
import {Request, Response, NextFunction} from "express"
import { User, hashPassword } from "../model/user.model";
import { error } from "console";
import { config } from "../config/config";

const signUp = async (req: any, res: any, next: NextFunction) =>{
    try{
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        const isUser = await User.findOne({email: data.email});
        console.log(isUser, "user find");
        if(!isUser){
            const hashedPass = await hashPassword(data.password);
            const user = new User({
                name: data.name,
                email: data.email,
                password: hashedPass
            });
            const savUser = await user.save();
            return res.status(201).json({
                message: "User registered successfully",
                data: {email: savUser.email, userId: savUser._id},
            })
        } else{
            res.statusCode = 409;
            next("User already registered")
        }
    } catch (error: any){
        const errorMessage = error.message;
        res.statusCOde = 500;
        next(errorMessage);
    }
};

const login = async (req: any, res: any, next: NextFunction) =>{
    try{
        const data = {
            email: req.body.email,
            password: req.body.password,
        };
        const isUser: any = await User.findOne({email: data.email});
        if(!isUser) {
            const errorMessage = "Unauthorized user";
            res.statusCOde = 500;
            throw new Error(errorMessage);
        }
        const isPasswordMatch = await bcrpyt.compare(
            data.password,
            isUser.password
        );
        console.log(isPasswordMatch, "passwordData", isUser.password);
        if(isPasswordMatch == false) {
            const errorMessage = "Authentication failed";
            res.statusCOde = 400;
            throw new Error(errorMessage);
        }
        const token = jwt.sign({
            email: isUser.email,
            userId: isUser._id.toString()
        },
        config.jwt.key,
        {expiresIn: "48h"}
        );
        res.status(200).json({
            message: "Login successfull",
            token: token,
            userId: isUser._id.toString(),
        });
    } catch (error: any){
        const errorMessage = error.message;
        res.statusCode = res.statusCOde || 500;
        next(errorMessage);
    }
};

export default{ signUp,login }
