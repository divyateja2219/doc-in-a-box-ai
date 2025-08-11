// api/healthTips.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a health advisor. Give 5 short, practical health tips."
        }
      ],
      max_tokens: 150,
    });

    const adviceText = completion.choices[0].message.content || "";
    const tips = adviceText.split("\n").filter(Boolean);

    res.status(200).json({ tips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ tips: [], error: "Failed to fetch health tips" });
  }
}
