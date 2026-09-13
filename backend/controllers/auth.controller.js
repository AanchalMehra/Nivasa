import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
export const signUp= async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name?.trim() || !email?.trim() || !password?.trim()){
            return res.status(400).json({error:"All fields are required"});
        }

        //check if user already exists
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({error:"User alredy exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user= await User.create({
            name,
            email,
            password:hashedPassword
        }
        )

        const token= await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"",
            maxAge:7*24*60*60*1000
        })

        const { password: _password, ...userData } = user.toObject();
        return res.status(201).json({message:"User created successfully",user:userData});


    }
    catch(error){
        console.error("Error during sign up:", error);
        return res.status(500).json({message:`SignUp error ${error}`});
    }

}

export const login= async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email?.trim() || !password?.trim()){
            return res.status(400).json({error:"All fields are required"});
        }

        const user=await User.findOne({email}).populate("listing", "title description host image1 image2 image3 rent city landMark category isBooked ratings");
        if(!user){
            return res.status(400).json({error:"User does not exist"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid credentials"});
        }

        const token= await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"",
            maxAge:7*24*60*60*1000
        })

        const { password: _password, ...userData } = user.toObject();

        return res.status(200).json({message:"Login successful",user:userData});

    }
    catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({message:`Login error ${error}`});
    }

}

export const logout=async(req,res)=>{
    try{
         res.clearCookie("token")
         return res.status(200).json({message:"Logout successful"});
    }
    catch(error){
        return res.status(500).json({message:`Logout error ${error}`});

    }
}
