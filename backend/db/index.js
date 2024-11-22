import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`)
        console.log(`MongoDB Connected On DB Host => ${connectionInstance.connection.host}`); 
    } catch (error) {
        console.log(`MongoDB Connection Error => `, error);
        process.exit(1)
    }
}

export default connectDB;