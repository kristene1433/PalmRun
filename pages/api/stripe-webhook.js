import Stripe from 'stripe';
import { buffer } from 'micro';
import dbConnect from '../../utils/db';
import Application from '../../models/Application';

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    await dbConnect();
    await Application.findOneAndUpdate(
      { 'payment.sessionId': session.id },
      { $set: { 'payment.status': 'paid' } }
    );
  }

  res.status(200).json({ received: true });
}
