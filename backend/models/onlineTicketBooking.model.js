import mongoose from "mongoose";

const onlineTicketBookingSchema = new mongoose.Schema({
    source:{
        type:String,
        required:true,
        lowercase:true,
    },
    destination:{
        type:String,
        required:true, 
        lowercase:true,
    },
    date:{
        type:Date,
        require:true,
        default: Date.now,
    },
    numberOfTicket:{
        type:Number,
        required:true,
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

const OnlineTicketBooking = mongoose.model('OnlineTicketBooking', onlineTicketBookingSchema);

export {
    OnlineTicketBooking
};