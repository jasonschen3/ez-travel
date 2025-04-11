import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface BookingData {
  source: string;
  destination: string;
  dateTime: string;
  email: string;
}

interface CheckoutData {
  bookingId: string;
  amount: number;
}

function validateBookingData(data: BookingData): string[] {
  const errors: string[] = [];

  if (!data.source) errors.push("Source is required");
  if (!data.destination) errors.push("Destination is required");
  if (!data.dateTime) errors.push("Departure date and time is required");
  if (!data.email) errors.push("Email is required");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  if (data.dateTime) {
    const departureDate = new Date(data.dateTime);
    const now = new Date();
    if (departureDate <= now) {
      errors.push("Departure date must be in the future");
    }
  }

  return errors;
}

async function sendEmail(data: BookingData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "tucker@tuckerritti.com",
    cc: "jasonschen3@gmail.com",
    subject: "New Booking Request",
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Source:</strong> ${data.source}</p>
      <p><strong>Destination:</strong> ${data.destination}</p>
      <p><strong>Departure Date/Time:</strong> ${new Date(
        data.dateTime
      ).toLocaleString()}</p>
      <p><strong>Customer Email:</strong> ${data.email}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
