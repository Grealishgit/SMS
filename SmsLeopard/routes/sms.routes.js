import { Router } from 'express';
import { sendSMS, deliveryReport, incomingSMS, checkBalance } from '../controllers/sms.controller.js';

const router = Router();

router.post('/send', sendSMS);
router.post('/delivery-report', deliveryReport);
router.post('/incoming', incomingSMS);
router.post('/balance', checkBalance);

export default router;