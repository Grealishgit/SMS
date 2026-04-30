# Africastalking SMS Service — Node.js + Express

A REST API for sending SMS, receiving incoming messages, and handling delivery reports using the [Africa's Talking](https://africastalking.com) SMS API.

---

## Prerequisites

- Node.js v18+
- An [Africa's Talking account](https://account.africastalking.com)
- [ngrok](https://ngrok.com) (for webhook testing)

---

## Getting Sandbox Credentials

1. Log in at [account.africastalking.com](https://account.africastalking.com)
2. Click **"Go To Sandbox App"** on your dashboard
3. Navigate to **Settings → API Key** and click **Generate API Key** — copy and store it (shown only once)
4. Your sandbox username is always the literal string `sandbox`

### Create a Shortcode (needed for incoming SMS)

1. In the sandbox dashboard, click **SMS → Shortcodes → Create Shortcode**
2. Enter a number e.g. `12345` and click **Submit**

### Launch the Simulator

1. Click **Launch Simulator** on the sandbox dashboard
2. Add a test phone number e.g. `+254700000000`
3. Keep the simulator open during testing — it acts as your virtual phone

---

## Project Structure

```
africastalking-sms/
├───├
│   ├── routes/
│   │   └── sms.routes.js        # Route definitions
│   ├── controllers/
│   │   └── sms.controller.js    # Send SMS + webhook logic
│   ├── services/
│   │   └── at.service.js        # Africastalking SDK setup
│                      # Express app setup
├── .env                         # Credentials (do not commit)
├── .env.example                 # Credential template
├── .gitignore
├── package.json
└── server.js                    # Entry point
```

---

## Installation

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd africastalking-sms

# 2. Install dependencies
npm install express africastalking dotenv body-parser
npm install --save-dev nodemon
```

Make sure your `package.json` includes:

```json
{
  "type": "module"
}
```

---

## Environment Variables

Create a `.env` file in the root:

```env
AT_USERNAME=sandbox
AT_API_KEY=your_api_key_here
PORT=3000
```

---

## Project Files

### `server.js`

```js
import app from "./src/app.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### `src/app.js`

```js
import express from "express";
import smsRoutes from "./routes/sms.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/sms", smsRoutes);

export default app;
```

### `src/services/at.service.js`

```js
import AfricasTalking from "africastalking";

const AT = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

export const smsService = AT.SMS;
```

### `src/routes/sms.routes.js`

```js
import { Router } from "express";
import {
  sendSMS,
  deliveryReport,
  incomingSMS,
} from "../controllers/sms.controller.js";

const router = Router();

router.post("/send", sendSMS);
router.post("/delivery-report", deliveryReport);
router.post("/incoming", incomingSMS);

export default router;
```

### `src/controllers/sms.controller.js`

```js
import { smsService } from "../services/at.service.js";

// Send SMS
export const sendSMS = async (req, res) => {
  const { to, message } = req.body;

  try {
    const result = await smsService.send({
      to: Array.isArray(to) ? to : [to],
      message,
      // do NOT pass from: '' — omit entirely for sandbox
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delivery Report Webhook — AT posts here automatically
export const deliveryReport = (req, res) => {
  const report = req.body;
  console.log("Delivery Report:", report);
  res.sendStatus(200);
};

// Incoming SMS Webhook — AT posts here when simulator sends a message
export const incomingSMS = (req, res) => {
  const message = req.body;
  console.log("Incoming SMS:", message);
  res.sendStatus(200);
};
```

---

## Running the Server

```bash
# Using Node.js built-in watch mode (v18+)
node --watch server.js

# Or with nodemon
npx nodemon server.js
```

You should see:

```
Server running on port 3000
```

---

## Testing

### 1. Expose Local Server via ngrok

Open a separate terminal and run:

```bash
ngrok http 3000
```

Copy the generated URL e.g. `https://abc123.ngrok-free.app`

### 2. Set Webhook URLs in AT Sandbox

1. Go to your sandbox dashboard → **SMS → Callbacks**
2. Set the following:

| Callback          | URL                                                     |
| ----------------- | ------------------------------------------------------- |
| Delivery Reports  | `https://abc123.ngrok-free.app/api/sms/delivery-report` |
| Incoming Messages | `https://abc123.ngrok-free.app/api/sms/incoming`        |

3. Click **Save**

### 3. Send an SMS

**POST** `http://localhost:3000/api/sms/send`

Headers:

```
Content-Type: application/json
```

Body:

```json
{
  "to": "+254700000000",
  "message": "Hello from Africastalking sandbox!"
}
```

curl:

```bash
curl -X POST http://localhost:3000/api/sms/send \
  -H "Content-Type: application/json" \
  -d '{"to": "+254700000000", "message": "Hello from Africastalking sandbox!"}'
```

Expected response:

```json
{
  "success": true,
  "data": {
    "SMSMessageData": {
      "Message": "Sent to 1/1 Total Cost: KES 0.8000",
      "Recipients": [
        {
          "statusCode": 101,
          "number": "+254700000000",
          "status": "Success",
          "cost": "KES 0.8000",
          "messageId": "ATXid_..."
        }
      ]
    }
  }
}
```

Check the **AT Simulator** — the SMS should appear on the virtual phone.

### 4. Test Incoming SMS (Simulator → Your App)

1. Open the **AT Simulator**
2. Tap the **SMS icon** (middle bottom button)
3. Tap **New Conversation**
4. In the **"To"** field type your shortcode e.g. `12345`
5. Type a message and hit **Send**

Terminal output:

```
Incoming SMS: {
  from: '+254700000000',
  to: '12345',
  text: 'your message',
  date: '...'
}
```

### 5. Delivery Reports

After sending an SMS, AT automatically POSTs to your delivery report webhook:

```
Delivery Report: {
  id: 'ATXid_...',
  status: 'Success',
  phoneNumber: '+254700000000',
  ...
}
```

---

## Common Issues & Fixes

| Issue                               | Fix                                                        |
| ----------------------------------- | ---------------------------------------------------------- |
| `"from" is not allowed to be empty` | Remove `from: ''` from `smsService.send()` entirely        |
| `401 Unauthorized`                  | Double-check `AT_API_KEY` in `.env`                        |
| SMS sent but not in simulator       | Make sure the simulator is open and the number matches     |
| Webhooks not firing                 | Verify ngrok is running and URLs are saved in AT dashboard |
| `Cannot find module`                | Ensure all imports include `.js` extensions                |

---

## Going to Production

1. Register a **Sender ID** (e.g. `MYAPP`) or **Shortcode** via AT dashboard under **Product Requests** — approval takes 3–7 days
2. Update `.env` with live credentials:

```env
AT_USERNAME=your_actual_username
AT_API_KEY=your_live_api_key
AT_SENDER_ID=MYAPP
PORT=3000
```

3. Update `smsService.send()` to include:

```js
from: process.env.AT_SENDER_ID;
```

> **Note:** In sandbox, all messages are intercepted by the simulator regardless of the recipient number. Real phone delivery only works with production credentials.

---

## .gitignore

```
node_modules/
.env
```
