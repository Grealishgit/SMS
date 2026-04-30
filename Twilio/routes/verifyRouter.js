import express from 'express';
import { verifyPhone } from '../controllers/verifyPhone.js';

const verifyRouter = express.Router();

verifyRouter.post('/verify-phone', verifyPhone);
export default verifyRouter;