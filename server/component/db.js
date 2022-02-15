import mongoose from "mongoose";

const Connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true })

        console.log("Database connected successfuly")
    } catch (error) {
        console.log("Error while connecting to database: " + error)
    }
}

export default Connection