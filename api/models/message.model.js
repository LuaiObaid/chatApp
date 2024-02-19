import mongoose from "mongoose";

const messageSchame = new  mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,// that would be a ref to the user 
        ref:"User", // user refrence from user collection
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }

}, {timestamps:true});

const Message = mongoose.model("Message", messageSchame);
export default Message