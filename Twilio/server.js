import express from 'express';
import dotenv from 'dotenv';
import whatsappRouter from './routes/whatsAppRouter.js';
import smsRouter from './routes/smsRouter.js';
import verifyRouter from './routes/verifyRouter.js';
import voiceRouter from './routes/voiceRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Twilio SandBox Server!');
});

app.use('/whatsapp', whatsappRouter);

app.use('/sms', smsRouter);

app.use('/verify', verifyRouter);

app.use('/voice', voiceRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})