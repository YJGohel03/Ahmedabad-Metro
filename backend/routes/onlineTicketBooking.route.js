import express from 'express'
import { ticketBookingHandle } from '../controller/onlineTicketBooking.controller.js';

const router = express.Router();

router.route('/bookticket')
        .post(ticketBookingHandle);

export default router;
