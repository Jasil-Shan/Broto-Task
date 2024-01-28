import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Your Fullname is required"],
    },
    place: {
        type: String,
        required: [true, "Your place is required"],
    },
    gender: {
        type: String,
        required: [true, "Your Gender is required"],
    },
    batch: {
        type: String,
        required: [true, "Your Batch is required"],
    },
    domain: {
        type: String,
        required: [true, "Your Gender is required"],
    },
    phone: {
        type: String,
        required: [true, "Your Phone is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const userModel = mongoose.model("user", userSchema)

export default userModel