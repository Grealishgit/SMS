import { smsService } from '../services/at.service.js';

// Send SMS
export const sendSMS = async (req, res) => {
    const { to, message } = req.body;

    try {
        const result = await smsService.send({
            to: Array.isArray(to) ? to : [to],  // accepts single or multiple numbers
            message,
            // from: ''
        });

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delivery Report Webhook — AT posts here
export const deliveryReport = (req, res) => {
    const report = req.body;
    console.log('Delivery Report:', report);
    // You can save to DB here later
    res.sendStatus(200);
};

// Incoming SMS Webhook — AT posts here
export const incomingSMS = (req, res) => {
    const message = req.body;
    console.log('Incoming SMS:', message);
    // You can process/reply here later
    res.sendStatus(200);
};