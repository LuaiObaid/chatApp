import mongoose from "mongoose";

const converstionSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    message: [ // Change 'messages' to 'message' here
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
}, { timestamps: true });


const Converstion = mongoose.model("Conversition", converstionSchema)
export default Converstion