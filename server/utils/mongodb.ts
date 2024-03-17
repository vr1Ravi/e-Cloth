import mongoose from "mongoose";

export async function connectMongoDb() {
  try {
    const mongoUrl = process.env.MONGO_URL || "";
    return await mongoose.connect(mongoUrl);
  } catch (error) {
    console.log(error);
  }
}
