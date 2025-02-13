import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("MongoDB already connected.");
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Connected!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        throw new Error("Database connection failed");
    }
};

export default connectMongoDB;
