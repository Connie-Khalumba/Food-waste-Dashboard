const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend requests

// Set environment and credentials
const APP_ENVIRONMENT = process.env.APP_ENVIRONMENT || 'live'; // Use environment variable
const consumer_key = process.env.PESAPAL_CONSUMER_KEY || 'mJzW86ofiyQrA32VZVsLNfkvcVRwBq11';
const consumer_secret = process.env.PESAPAL_CONSUMER_SECRET || 'hNawYd7EibHI4QPwruQ6RX/Ax84=';

// Define the API URLs based on environment
let api_url, ipn_registration_url, submit_order_url, get_ipn_list_url;

if (APP_ENVIRONMENT === 'sandbox') {
  api_url = 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken';
  ipn_registration_url = 'https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN';
  submit_order_url = 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest';
  get_ipn_list_url = 'https://cybqa.pesapal.com/pesapalv3/api/URLSetup/GetIpnList';
} else if (APP_ENVIRONMENT === 'live') {
  api_url = 'https://pay.pesapal.com/v3/api/Auth/RequestToken';
  ipn_registration_url = 'https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN';
  submit_order_url = 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest';
  get_ipn_list_url = 'https://pay.pesapal.com/v3/api/URLSetup/GetIpnList';
} else {
  console.error('Invalid APP_ENVIRONMENT');
  process.exit(1);
}

// Step 1: Request Token from Pesapal
async function requestToken() {
  try {
    const response = await axios.post(
      api_url,
      {
        consumer_key,
        consumer_secret,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 && response.data.token) {
      console.log('Token:', response.data.token);
      return response.data.token;
    } else {
      throw new Error(`Error requesting token: ${response.status}`);
    }
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
}

// Step 2: Register IPN (Instant Payment Notification)
async function registerIPN(token) {
  try {
    const response = await axios.post(
      ipn_registration_url,
      {
        url: process.env.IPN_CALLBACK_URL || 'https://your-url.com/pesapal/pin.php', // Replace with your callback URL
        ipn_notification_type: 'POST',
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.ipn_id) {
      console.log('IPN ID:', response.data.ipn_id);
      return response.data.ipn_id;
    } else {
      throw new Error(`Error registering IPN: ${response.status}`);
    }
  } catch (error) {
    console.error('IPN Error:', error.response?.data || error.message);
    throw error;
  }
}

// Step 3: Submit Order Request
async function submitOrder(token, ipn_id, paymentData) {
  const { email, phone, firstName, lastName, description } = paymentData;
  const merchant_reference = Math.floor(Math.random() * 1000000000000000000);
  const amount = 1000; // Fixed amount for organizations (e.g., 1000 KES)
  const callback_url = process.env.CALLBACK_URL || 'https://redifu-dashboard.vercel.app/payment-confirmation'; // Update with your Vercel domain
  const branch = 'Nito_industries';

  const data = {
    id: String(merchant_reference),
    currency: 'KES',
    amount,
    description: description || 'Payment for RediFu services',
    callback_url,
    notification_id: ipn_id,
    branch,
    billing_address: {
      email_address: email,
      phone_number: phone,
      country_code: 'KE',
      first_name: firstName,
      middle_name: '',
      last_name: lastName,
      line_1: 'Pesapal Limited',
      line_2: '',
      city: '',
      state: '',
      postal_code: '',
      zip_code: '',
    },
  };

  try {
    const response = await axios.post(submit_order_url, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.order_tracking_id) {
      console.log('Order Tracking ID:', response.data.order_tracking_id);
      console.log('Redirect URL:', response.data.redirect_url);
      return response.data;
    } else {
      throw new Error(`Error submitting order: ${response.status}`);
    }
  } catch (error) {
    console.error('Order Error:', error.response?.data || error.message);
    throw error;
  }
}

// API endpoint to initiate payment
app.post('/api/create-payment', async (req, res) => {
  try {
    console.log('Starting Pesapal Payment Process...');

    // Step 1: Get the token
    const token = await requestToken();
    if (!token) {
      return res.status(500).json({ error: 'Failed to retrieve token' });
    }

    // Step 2: Register IPN
    const ipn_id = await registerIPN(token);
    if (!ipn_id) {
      return res.status(500).json({ error: 'Failed to register IPN' });
    }

    // Step 3: Submit the order
    const orderResponse = await submitOrder(token, ipn_id, req.body);
    res.json({ paymentUrl: orderResponse.redirect_url });
  } catch (error) {
    console.error('Error in the payment process:', error.message);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));