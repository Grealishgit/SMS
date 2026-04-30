import AfricasTalking from 'africastalking';

const AT = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

export const smsService = AT.SMS;