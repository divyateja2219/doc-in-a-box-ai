export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests are allowed");
  }

  const { Body } = req.body;

  if (!Body) {
    return res.status(400).send("Missing 'Body' in request");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
              "You are a friendly AI doctor. Help users with general health advice based on symptoms. Be simple, polite, and suggest seeing a doctor if needed.",
          },
          {
            role: "user",
            content: Body,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data?.choices?.[0]?.message?.content) {
      console.error("🛑 OpenAI API response invalid:", JSON.stringify(data, null, 2));
      throw new Error("Invalid OpenAI response structure");
    }

    const reply = data.choices[0].message.content.trim();

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>${reply}</Message>
      </Response>
    `);
  } catch (error) {
    console.error("💥 Error in /api/whatsapp:", error);
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>Sorry, something went wrong on our side.</Message>
      </Response>
    `);
  }
}
