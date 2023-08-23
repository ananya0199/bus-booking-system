 import jwt from "jsonwebtoken";
 import { Request, Response, NextFunction } from "express";
 import { config } from "../config/config";
 export const authUser = async (
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
    try{
        const authToken = req.get("Authorization");
        if(!authToken) {
            const errorMessage = "User is not authorized";
            res.statusCode = 401;
            throw new Error(errorMessage);
        }
        const token = authToken.split(" ")[1];

        jwt.verify(token, config.jwt.key, (err, decoded: any) =>{
            if(err) {
                const errorMessage = "User is not authorized or token is missing";
                res.statusCode = 401;
                throw new Error(errorMessage)
            }
            console.log(decoded, "middleware token");
            req.body.userId = decoded.userId;
        });
        next();
    }
    catch(error:any) {
        const errorMessage = error.message;
        res.statusCode = res.statusCode || 500;
        next(errorMessage);
    }
 };