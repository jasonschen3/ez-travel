import Stripe from "stripe";
import env from "dotenv";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_PRIVATE!);
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(body)

    const {
      bookingId,
      amount,
      itinerary,
      email,
      source,
      destination,
      dateTime,
    } = body;

    // Create Stripe checkout session
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
      metadata: {
        email,
        source,
        destination,
        // itinerary: JSON.stringify(itinerary), Too large, pass in the success_url instead
        url: `${process.env.FRONTEND_IP}/trip?bookingId=${bookingId}`, // Pass in the success url instead
        dateTime,
        bookingId,
      },
    });

    // Save booking to the database
    await prisma.booking.create({
      data: {
        id: bookingId,
        itinerary: itinerary,
        cost: amount,
        email: email,
      },
    });

    console.log("DONE CHECKOUT");

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
