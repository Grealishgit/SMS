import { Router } from 'express';
import {sendCelcomSms} from '../controllers/sms.controller.js';
     

const router = Router();

router.post('/celcom/send', sendCelcomSms);

export default router;