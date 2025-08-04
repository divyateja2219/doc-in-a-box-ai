export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests are allowed");
  }

  const { Body } = req.body;

  if (!Body) {
    return res.status(400).send("Missing 'Body' in request");
  }

  try {
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
              "You are a friendly and helpful virtual doctor. Respond in clear, simple language. If symptoms are mild, offer home remedies. If symptoms seem serious, politely suggest the user see a real doctor. Do not scare the user.",
          },
          {
            role: "user",
            content: Body,
          },
        ],
        temperature: 0.6,
      }),
    });

    const data = await openaiResponse.json();
    console.log("🩺 OpenAI Response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("⚠️ Missing reply from OpenAI:", data);
      return res.status(500).send(`
        <Response>
          <Message>Sorry, I couldn’t process that. Please try again later.</Message>
        </Response>
      `);
    }

    // XML-encode to avoid issues with characters
    const safeReply = reply.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>${safeReply}</Message>
      </Response>
    `);
  } catch (error) {
    console.error("💥 Server Error:", error);
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>Sorry, something went wrong on our side.</Message>
      </Response>
    `);
  }
}
