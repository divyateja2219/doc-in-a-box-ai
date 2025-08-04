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
              "You are a helpful and cautious AI doctor assistant. Respond in friendly language. Suggest basic advice based on symptoms, but always recommend consulting a real doctor if the issue may be serious.",
          },
          {
            role: "user",
            content: Body,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await openaiResponse.json();

    if (!data?.choices?.[0]?.message?.content) {
      console.error("OpenAI error:", data);
      throw new Error("Invalid OpenAI response");
    }

    const reply = data.choices[0].message.content.trim();

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>${reply}</Message>
      </Response>
    `);
  } catch (error) {
    console.error("API handler error:", error);
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>Sorry, something went wrong on our side.</Message>
      </Response>
    `);
  }
}
