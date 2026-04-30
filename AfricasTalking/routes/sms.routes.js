import { Router } from 'express';
import { sendSMS, deliveryReport, incomingSMS } from '../controllers/sms.controller.js';

const router = Router();

router.post('/send', sendSMS);                      // Send SMS
router.post('/delivery-report', deliveryReport);    // AT calls this
router.post('/incoming', incomingSMS);              // AT calls this

export default router;