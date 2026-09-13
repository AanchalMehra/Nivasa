import express from "express";
const userRouter=express.Router();
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js";

userRouter.get('/currentuser',isAuth,getCurrentUser);

export default userRouter;
