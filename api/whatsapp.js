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
            content: "You are a friendly and cautious virtual doctor...",
          },
          {
            role: "user",
            content: Body,
          },
        ],
      }),
    });

    const data = await openaiResponse.json();
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));
    content: "You are a friendly virtual doctor. Respond in a helpful, clear, and conversational way. Provide basic suggestions based on user symptoms. If the situation sounds serious, politely recommend seeing a real doctor.",

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>${reply}</Message>
      </Response>
    `);
  } catch (error) {
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(`
      <Response>
        <Message>Sorry, something went wrong.</Message>
      </Response>
    `);
  }
}
