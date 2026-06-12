require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Payrex = require('payrex-node');

const app = express();
const PORT = 4242;

const payrexSecretApiKey = process.env.PAYREX_SECRET_API_KEY || '';
const payrex = new Payrex(payrexSecretApiKey);

app.use(cors());
app.use(express.json());

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    console.log('Received amount:', amount);
    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    const paymentIntent = await payrex.paymentIntents.create({
      amount: amount,
      currency: 'PHP',
      payment_methods: ['card', 'gcash', 'maya', 'qrph'],
    });

    res.json({ clientSecret: paymentIntent.clientSecret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
