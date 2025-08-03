export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests are allowed");
  }

  const { Body } = req.body;

  if (!Body) {
    return res.status(400).send("Missing 'Body' in request");
  }
  try {
    // Call OpenAI with user input
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly and cautious virtual doctor. Offer basic advice based on symptoms, and suggest seeing a real doctor when needed.",
          },
          {
            role: "user",
            content: Body,
          },
        ],
      }),
    });

    const data = await openaiResponse.json();

    const reply = data?.choices?.[0]?.message?.content?.trim() || "I'm sorry, I couldn't understand that.";

    // Respond to Twilio in XML
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>${reply}</Message>
      </Response>
    `);
  } catch (error) {
    console.error("OpenAI error:", error);

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>Sorry, there was a technical error. Please try again later.</Message>
      </Response>
    `);
  }
}
