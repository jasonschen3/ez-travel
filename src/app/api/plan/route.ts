import { NextResponse } from "next/server";
import OpenAI from "openai";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { source, destination, dateTime } = body;

    if (!source || !destination || !dateTime) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userPrompt = `Generate a trip from ${source} to ${destination} starting on ${dateTime}, using TGV, Ryanair, and Uber (if needed).
      Follow these exact rules:
      1. Always check train connections first
      2. Only suggest flights for distances over 500km
      3. Include Uber only for local transport under 30km
      4. Format prices in EUR
      5. Use 24-hour time format
      Return the response as a JSON object with exactly this structure:
      {
        "steps": [
          {
            "mode": "string",
            "from": "string",
            "to": "string",
            "departure": "ISO datetime",
            "arrival": "ISO datetime",
            "duration": "string",
            "cost": number
          }
        ],
        "totalCost": "string",
        "totalTime": "string"
      }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    // console.log(content);

    // GPT will generate the json starting with the ```json
    const jsonMatch = content.match(/```json([\s\S]*?)```|```([\s\S]*?)```/);
    const jsonString = jsonMatch?.[1] || jsonMatch?.[2] || content;

    const itinerary = JSON.parse(jsonString.trim());
    return NextResponse.json({ success: true, itinerary });
  } catch (error: any) {
    console.error("Error generating itinerary", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
