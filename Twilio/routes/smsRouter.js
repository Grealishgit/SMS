import express from 'express';
import { sendSmsMessage } from '../controllers/sendSmsMessage.js';

const smsRouter = express.Router();

smsRouter.post('/send-sms', sendSmsMessage);

export default smsRouter;
