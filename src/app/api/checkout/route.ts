import Stripe from "stripe";
import env from "dotenv";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_PRIVATE!);
const prisma = new PrismaClient();

async function sendConfirmationEmail(data: {
  email: string;
  source: string;
  destination: string;
  dateTime: string;
  bookingId: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: data.email,
    cc: ["tucker@tuckerritti.com", "jasonschen3@gmail.com"],
    subject: "Booking Confirmation - Your Travel Details",
    html: `
      <h2>Booking Confirmation</h2>
      <p>Thank you for booking your trip with us! Here are your travel details:</p>
      <p><strong>Source:</strong> ${data.source}</p>
      <p><strong>Destination:</strong> ${data.destination}</p>
      <p><strong>Departure Date/Time:</strong> ${new Date(
        data.dateTime
      ).toLocaleString()}</p>
      <p><strong>Booking ID:</strong> ${data.bookingId}</p>
      <p>We hope you have a great journey!</p>
      <p>Best regards,</p>
      <p>The Travel Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error("Failed to send confirmation email");
  }
}

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

    // Send confirmation email
    await sendConfirmationEmail({
      email,
      source,
      destination,
      dateTime,
      bookingId,
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
