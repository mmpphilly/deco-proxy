
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = process.env.DECO_API_KEY;
const BASE_URL = 'https://[your-subdomain].deconetwork.com/api/v1/orders';

app.get('/track', async (req, res) => {
  const { orderId, email } = req.query;

  const response = await fetch(`${BASE_URL}/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  const data = await response.json();

  if (data && data.customer_email.toLowerCase() === email.toLowerCase()) {
    res.json({
      status: data.order_status,
      tracking: data.tracking_number || 'Not available'
    });
  } else {
    res.status(404).json({ error: 'Order not found or email mismatch' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
