export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const { Body } = req.body;

  if (!Body) {
    return res.status(400).send("Missing message body");
  }

  // Call OpenAI
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI doctor. Respond simply to symptoms." },
        { role: "user", content: Body },
      ],
    }),
  });

  const json = await response.json();
  const aiReply = json?.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";

  // Reply to WhatsApp using TwiML
  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Message>${aiReply}</Message>
    </Response>
  `);
}
