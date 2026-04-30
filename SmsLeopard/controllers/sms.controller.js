import { sendSMSLeopard, getBalance } from '../services/smsleopard.service.js';

// Send SMS
export const sendSMS = async (req, res) => {
    const { destination, message } = req.body;

    try {
        const result = await sendSMSLeopard({ destination, message });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delivery Report Webhook
export const deliveryReport = (req, res) => {
    const report = req.body;
    console.log('Delivery Report:', report);
    res.sendStatus(200);
};

// Incoming SMS Webhook
export const incomingSMS = (req, res) => {
    const message = req.body;
    console.log('Incoming SMS:', message);
    res.sendStatus(200);
};

export const checkBalance = async (req, res) => {
    try {
        const result = await getBalance();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};