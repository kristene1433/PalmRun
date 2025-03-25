import Stripe from 'stripe';
import dbConnect from '../../utils/db';
import Application from '../../models/Application';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { amount, appId } = req.body;

  try {
    await dbConnect();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Palm Run Rental Payment' },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/user/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/user/payment-cancel`,
    });

    // Save the payment session info to the corresponding application
    await Application.findByIdAndUpdate(appId, {
      $set: {
        payment: {
          amount,
          sessionId: session.id,
          status: 'pending',
          date: new Date(),
        },
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
}
