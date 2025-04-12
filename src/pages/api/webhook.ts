import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_PRIVATE!);
const prisma = new PrismaClient();

// IMPORT FOR NEXTJS
export const config = {
  api: {
    bodyParser: false, // this is CRUCIAL for raw body
  },
};

async function sendConfirmationEmail(data: {
  email: string;
  source: string;
  destination: string;
  dateTime: string;
  bookingId: string;
  url: string;
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
        <p>View itinerary at ${data.url}</p>
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

/** START OF WEBHOOK */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("WEBHOOK ACTIVE");
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"] as string;
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  // Submit order if completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Extract metadata
    const { email, source, destination, url, dateTime, bookingId } =
      session.metadata as {
        email: string;
        source: string;
        destination: string;
        url: string;
        dateTime: string;
        bookingId: string;
      };

    try {
      // Update valid
      await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          valid: true,
        },
      });

      // Send confirmation email
      await sendConfirmationEmail({
        email,
        source,
        destination,
        dateTime,
        bookingId,
        url,
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(200).json({ received: true });
}
