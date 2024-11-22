import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// Routes

import userRouter from "./routes/user.route.js" 
import onlineTicketBookingRouter from "./routes/onlineTicketBooking.route.js"
import smartCardRouter from "./routes/smartcard.route.js"
app.use('/api/v1/user', userRouter);
app.use('/api/v1/ticket', onlineTicketBookingRouter);
app.use('/api/v1/smartcard', smartCardRouter);

export {
    app
}