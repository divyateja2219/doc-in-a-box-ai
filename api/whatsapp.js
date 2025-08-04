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
          content: "You are a friendly virtual doctor. Respond to symptoms in a helpful, clear, and non-alarming way. If symptoms seem serious, politely recommend seeing a real doctor.",
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
    console.error("OpenAI API response error:", data);
    throw new Error("No valid response from OpenAI");
  }

  const reply = data.choices[0].message.content.trim();

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);
} catch (error) {
  console.error("Caught error:", error);
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Message>Sorry, something went wrong on our side.</Message>
    </Response>
  `);
}
}
