import mongoose from "mongoose";

const smartCardSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

const SmartCard = mongoose.model("SmartCard", smartCardSchema);

export {
    SmartCard
};