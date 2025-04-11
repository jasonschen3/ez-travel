import Stripe from "stripe";
import env from "dotenv";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_PRIVATE!);

export async function POST(request: Request) {
  try {
    const { bookingId, amount } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Trip Booking - ${bookingId}`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_IP}/trip?bookingId=${bookingId}`,
      cancel_url: `${process.env.FRONTEND_IP}/book`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
