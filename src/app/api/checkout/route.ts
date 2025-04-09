import Stripe from "stripe";
import env from "dotenv";

const stripe = new Stripe(process.env.STRIPE_PRIVATE!);

interface CheckoutData {
  bookingId: string;
  amount: number;
}

// TODO
export async function POST(data: CheckoutData) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Trip from ${data.bookingId}`,
            },
            unit_amount: data.amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_IP}/trip?bookingId=${data.bookingId}`,
      cancel_url: `${process.env.FRONTEND_IP}/book`,
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
}
