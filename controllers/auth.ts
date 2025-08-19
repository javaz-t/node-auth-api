import  Express   from "express";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import User from "../schema/user";
 
const registerUser =async ( req : Express.Request, res : Express.Response)=>{
    try{
const { name, email, authentication: { password } } = req.body;
    console.log(`password: ${password} : ${req.body}`);
    //check user already exist 
    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(201).send({"message":"User already exist , Plase log in "});
    }
    //hashng the password 
   const hashedPassword = bcrypt.hashSync( password , 10);
console.log(hashedPassword);
    // savign the user in mongo db 
    const newUser = new User({
        name,
        email,
        authentication:{
            password:hashedPassword,
        }
    });
    await newUser.save();
    //sent status code 201 with response 
    res.status(201).send({message:"User account has created !",user:newUser})
    } catch (err){
        console.log(`error is${err}`);
    };


 }

const logInUser = async( req : Express.Request, res : Express.Response)=>{
 const { email,  password  } = req.body;
//check user is registerd 
console.log(`email ${email}`);
 const userExist = await User.findOne({email}).select("+authentication.password"); //in schema it select is false   
    if(!userExist){
        return res.status(401).send({"message":"email not found ,please register "});
    }
   
//check password is correct 
const hashedPasswordInDb = userExist.authentication?.password;

const passwordMatch = bcrypt.compareSync(password, hashedPasswordInDb as string);
if (!passwordMatch) {
  return res.status(401).json({ message: "Invalid password" });
}

//generate access token 
const token = Jwt.sign(String(userExist._id),process.env.APP_SECRET as string ); 
//set access cookie 
res.cookie("AUTH_COOKIE",token);
if(userExist.authentication){
    userExist.authentication.access_token=token 
}
await userExist.save()
res.status(200).send({ message: "Login successful", accessToken:token });
  
}

const logOut = ( req : Express.Request, res : Express.Response)=>{
  res.cookie("AUTH_COOKIE","");
  return res.status(2001).send({message:"logout successfully"});
}

const getAllUsers= async( req : Express.Request, res : Express.Response)=>{
    const allUsers = await User.find();
    return res.status(200).send(allUsers)
}

const deleteUser = async (req: Express.Request, res: Express.Response) => {
  try {
    const { email } = req.body; // or you can use req.params.id if deleting by id
console.log(`email : delete ${email}`); 
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.deleteOne({ email });
      res.cookie("AUTH_COOKIE","");
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error });
  }
};
export {registerUser, logInUser,logOut ,deleteUser,getAllUsers} 