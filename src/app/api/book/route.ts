import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface BookingData {
  source: string;
  destination: string;
  dateTime: string;
  email: string;
}

function validateBookingData(data: BookingData): string[] {
  const errors: string[] = [];

  if (!data.source) errors.push("Source is required");
  if (!data.destination) errors.push("Destination is required");
  if (!data.dateTime) errors.push("Departure date and time is required");
  if (!data.email) errors.push("Email is required");

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  // Date validation
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
      <p><strong>Departure Date/Time:</strong> ${new Date(data.dateTime).toLocaleString()}</p>
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

export async function POST(request: Request) {
  try {
    const data: BookingData = await request.json();
    const errors = validateBookingData(data);

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Send email with booking data
    await sendEmail(data);

    // Log the valid data
    console.log("Valid booking data received:", data);

    return NextResponse.json(
      { success: true, message: "Booking request received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      { success: false, errors: ["Internal server error"] },
      { status: 500 }
    );
  }
} 