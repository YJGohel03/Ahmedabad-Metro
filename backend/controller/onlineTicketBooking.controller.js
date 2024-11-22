import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { OnlineTicketBooking } from "../models/onlineTicketBooking.model.js";

const ticketBookingHandle = asyncHandler( async(req, res) => {
    const { source, destination, date, number } = req.body;
    console.log(req.body);

    if(!source || !destination || !date || !number) {
        throw new ApiError(400, "All fields are required for ticket booking");
    }

    if(source == destination) {
        throw new ApiError(400, "Source and Destination can not be same")
    }

    let userEnteredDate = new Date(date);
    if(userEnteredDate < new Date()){
        throw new ApiError(400, "Please choose proper date")
    }

    if(parseInt(number) <= 0) {
        throw new ApiError(400, "Ticket must be grater than zero.")
    }
    
    const bookedTicket = await OnlineTicketBooking.create({
        source,
        destination,
        date: userEnteredDate,
        numberOfTicket: parseInt(number),
        userId:'666ddc389fe75591fbaa3da9'
    })

    return res
    .status(201)
    .json(new ApiResponse(201, bookedTicket, "Ticket Booked Successfully!!"));
} )

export {
    ticketBookingHandle
}