import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Groq API Key is missing." }, { status: 500 });
    }

    const body = await req.json();
    const payload = {
      model: body.model || "canopylabs/orpheus-v1-english",
      input: body.input,
      voice: body.voice || "hannah",
      response_format: body.response_format || "wav",
    };

    const response = await fetch("https://api.groq.com/openai/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq TTS API error details:", errorData);
      return NextResponse.json(
        { error: `Groq TTS API Error: ${errorData}` },
        { status: response.status },
      );
    }

    // Return the raw audio blob/stream
    const audioBlob = await response.blob();
    return new NextResponse(audioBlob, {
      headers: {
        "Content-Type": "audio/wav",
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
