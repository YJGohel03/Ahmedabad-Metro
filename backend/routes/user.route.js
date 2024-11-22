import express from 'express'
import { 
    loginhandle,
    registerHandle
} from "../controller/user.controller.js"
const router = express.Router()

router.route('/register')
        .post(registerHandle);
router.route('/login')
        .post(loginhandle);
export default router;