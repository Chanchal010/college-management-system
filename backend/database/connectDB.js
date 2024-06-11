import mongoose from "mongoose";
import { dbName } from "../dbName.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)

        console.log("MongoDB connected. DB host: ", connectionInstance.connection.host);
        }catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
};

export default connectDB;