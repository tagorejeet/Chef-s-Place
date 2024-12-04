import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://tagorejeet2409:24092004@cluster0.v4lfoob.mongodb.net/food-del').then(()=>console.log
("DB connected."));
}