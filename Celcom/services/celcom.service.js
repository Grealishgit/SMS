export const sendCelcomSMS = async ({ mobile, message }) => {
    const response = await fetch('https://isms.celcomafrica.com/api/services/sendsms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            apikey: process.env.CELCOM_API_KEY,
            partnerID: process.env.CELCOM_PARTNER_ID,
            shortcode: process.env.CELCOM_SHORTCODE,
            mobile,         // e.g. '0712345678' or '254712345678'
            message,
            pass_type: 'plain',
        }),
    });

    const data = await response.json();
    return data;
};