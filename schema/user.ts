import { access } from "fs";
import mongoose from "mongoose";
    
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    authentication:{
        password:{type:String,select:false},
        access_token:{type:String ,select:false},
    },
})

const User = mongoose.model("User",userSchema);
export default User;