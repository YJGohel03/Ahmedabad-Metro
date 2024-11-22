import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SmartCard } from "../models/smartcard.model.js";

const createSmartCardHandle = asyncHandler( async(req, res) => {
    const {fullname, email, contact, address} = req.body;

    if(!fullname || !email || !contact || !address) {
        throw new ApiError(300, "All fields are required.")
    }

    if(contact.length < 10) {
        throw new ApiError(400, "Contact number must be ten digit.");
    }

    const newSmartCard = await SmartCard.create({
        fullname,
        email,
        contact,
        address
    });

    return res
    .status(201)
    .json(new ApiResponse(201, newSmartCard, "Smart Card Created Successfully!!"));
});

export {
    createSmartCardHandle
}