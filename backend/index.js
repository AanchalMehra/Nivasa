import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_URL
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);

app.get("/",(req,res)=>{
    res.send('Backend is running');
})

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})
