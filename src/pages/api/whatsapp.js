// src/pages/api/whatsapp.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const { Body, From } = req.body;

  if (!Body || !From) {
    return res.status(400).send("Missing message or sender");
  }

  // Fetch AI response from OpenAI
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful virtual doctor. Respond with basic advice, and suggest seeing a real doctor if needed.",
        },
        {
          role: "user",
          content: Body,
        },
      ],
    }),
  });

  const json = await openaiRes.json();
  const reply = json?.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";

  // Respond back to Twilio in WhatsApp message format (TwiML)
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);
}
