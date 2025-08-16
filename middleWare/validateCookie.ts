import  Express  from "express";
import User from "../schema/user";

export const validateCookie = async(
    req : Express.Request, res : Express.Response,next:Express.NextFunction

)=>  {

    const cookie = req.cookies;
    if(!cookie.AUTH_COOKIE){
        return  res.status(401).send({message:"NO cookie found "})
    }
    const userExistWithAccessToken = await User.findOne({"authentication.access_token":cookie.AUTH_COOKIE})
    if(!userExistWithAccessToken){
                return  res.status(401).send({message:"NO cookie foundd "})

    }
    next();
}