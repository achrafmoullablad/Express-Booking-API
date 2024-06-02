import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDb disconnected!");
});

mongoose.connection.on("connected",()=>{
    console.log("mongoDb connected!");
});

//middleware:
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/hotels", hotelRoute);
app.use("/api/v1/rooms", roomRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});

app.listen(8881, ()=>{
    connect();
    console.log("Connect to backend.");
});