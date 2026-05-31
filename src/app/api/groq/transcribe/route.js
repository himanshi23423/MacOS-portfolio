import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Groq API Key is missing." }, { status: 500 });
    }

    const formData = await req.formData();
    if (!formData.has("model")) {
      formData.append("model", "whisper-large-v3");
    }
    if (!formData.has("prompt")) {
      formData.append(
        "prompt",
        "Hello Siri, how can I help you today? Open Music app. Show me your projects. Tell me about Newtube. Open Safari browser. Weather update. Stop music. Bye Siri.",
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: `Whisper API Error: ${errorData}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Transcription API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
