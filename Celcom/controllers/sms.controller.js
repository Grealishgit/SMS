import { sendCelcomSMS } from '../services/celcom.service.js';

// ... existing AT controllers ...

// Celcom Africa — Send SMS
export const sendCelcomSms = async (req, res) => {
  const { mobile, message } = req.body;

  try {
    const result = await sendCelcomSMS({ mobile, message });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};