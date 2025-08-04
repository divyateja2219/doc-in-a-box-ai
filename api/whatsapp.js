export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests are allowed");
  }

  try {
    // Parse incoming Twilio webhook format
    const bodyData = req.body?.Body || req.body?.body || req.body;
    const userMessage = typeof bodyData === "string" ? bodyData : "";

    if (!userMessage || userMessage.trim().length === 0) {
      return res.status(400).send("Missing or empty 'Body' in request");
    }

    // Call OpenAI API
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
              "You are a friendly virtual doctor. Respond to symptoms in a helpful, clear, and non-alarming way. If symptoms seem serious, politely recommend seeing a real doctor.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await openaiResponse.json();

    // Check if OpenAI returned a valid message
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't understand that.";

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>${reply}</Message>
      </Response>
    `);
  } catch (error) {
    console.error("API Error:", error.message || error);

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>Sorry, something went wrong on our side. Please try again later.</Message>
      </Response>
    `);
  }
}
