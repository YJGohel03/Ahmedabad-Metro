import express from 'express'
import  {
    createSmartCardHandle
} from '../controller/smartcard.controller.js'
const router = express.Router();

router.route('/newsmartcard')
        .post(createSmartCardHandle);

export default router; 