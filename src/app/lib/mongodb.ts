import mongoose from "mongoose"

const connectMongoDB = () =>{
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        console.log("New mongodb connection established");
        
    } catch (error) {
        console.log();
        
    }
}

export default connectMongoDB