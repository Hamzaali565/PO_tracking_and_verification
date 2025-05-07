import mongoose from "mongoose";

const dbConfig = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`database connected at host ${connection.connection.host}`);
    } catch (error) {
        console.log("Db connection failed with -->", error);

    }
}


export { dbConfig }