// src/pages/api/symptom-checker.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms are required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful medical assistant. Ask follow-up questions or give suggestions based on symptoms.' },
          { role: 'user', content: `My symptoms: ${symptoms}` },
        ],
      }),
    });

    const data = await response.json();
    const diagnosis = data.choices?.[0]?.message?.content;

    res.status(200).json({ diagnosis });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch diagnosis' });
  }
}
