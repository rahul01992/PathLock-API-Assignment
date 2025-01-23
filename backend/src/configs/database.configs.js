import mongoose from "mongoose";
import { APP_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://rahul01992:13KGvI9y046mbSgj@cluster0.dznyo.mongodb.net/API`);
    console.log(`DATABASE CONNECTED`);
  } catch (error) {
    console.log(`!!! DATABASE CONNECTION ERROR !!!`);
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
