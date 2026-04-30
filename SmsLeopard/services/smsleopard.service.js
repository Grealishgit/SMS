export const sendSMSLeopard = async ({ destination, message }) => {
  const apiKey = process.env.SMSLEOPARD_API_KEY;
  const apiSecret = process.env.SMSLEOPARD_API_SECRET;
  const source = process.env.SMSLEOPARD_SENDER_ID || "SMS_Leopard";

  // 1. Format destination so it always matches the 'array of objects' format
  const destinationNumbers = Array.isArray(destination)
    ? destination.map(num => ({ number: num }))
    : [{ number: destination }];

  const requestBody = {
    source: source,
    message: message,
    destination: destinationNumbers
  };



  // 3. Use Basic Auth
  const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const response = await fetch('https://api.smsleopard.com/v1/sms/send', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API responded with ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  // 4. Add better logging to help with future debugging
  if (!data.success) {
    console.error('SMSLeopard API Error:', data.message, data);
  }

  return data;
};

export const getBalance = async () => {
  const apiKey = process.env.SMSLEOPARD_API_KEY;
  const apiSecret = process.env.SMSLEOPARD_API_SECRET;
  const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const url = 'https://api.smsleopard.com/v1/balance';
  console.log('Fetching balance from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Authorization': `Basic ${token}` },
  });

  const text = await response.text(); // Get raw response
  console.log('Raw balance response:', text);

  try {
    const data = JSON.parse(text);
    return data;
  } catch (e) {
    return { error_message: 'Invalid JSON response', raw: text };
  }
};