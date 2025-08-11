export default async function handler(req, res) {
  if (req.method === "POST") {
    const { symptoms } = req.body;

    // Here you can call your AI logic or Twilio WhatsApp backend
    const aiResponse = `Based on symptoms: "${symptoms}", you may want to rest, hydrate, and consult a doctor if symptoms persist.`;

    return res.status(200).json({ response: aiResponse });
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
