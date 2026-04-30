import express from 'express';
import { sendWhatsAppMessage } from '../controllers/sendWhatsAppMessage.js';

const whatsappRouter = express.Router();

whatsappRouter.post('/send-whatsapp-message', sendWhatsAppMessage);

export default whatsappRouter;
