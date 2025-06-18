import mongoose from "mongoose";

const connectDb = async (MONGODB_URI: string) => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection failed", error)
    throw error
  }
}

export default connectDb