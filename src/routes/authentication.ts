import  Express   from "express";
import { logInUser, logOut, registerUser ,deleteUser,getAllUsers} from "../controllers/auth";
import { validateCookie } from "../middleWare/validateCookie";

const authRouter = Express.Router();

 
authRouter.post('/signUp',registerUser)
authRouter.post('/logIn',logInUser)
authRouter.post('/logOut',logOut)
authRouter.post('/deleteUser',deleteUser)

authRouter.get('/getAllUsers',validateCookie,getAllUsers)




export default authRouter;