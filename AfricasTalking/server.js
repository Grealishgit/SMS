import express from 'express';
import 'dotenv/config';
import smsRoutes from './routes/sms.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // needed for AT webhooks

app.use('/api/sms', smsRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});