import express from 'express';
import { voiceVerification } from '../controllers/voiceVerification.js';

const voiceRouter = express.Router();

voiceRouter.post('/verify-voice', voiceVerification)


export default voiceRouter;