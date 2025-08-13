// Serverless WhatsApp webhook for Vercel + Twilio + OpenAI (ESM style)

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini"; // good, fast, inexpensive

// ---- Helpers ----
function parseForm(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const data = Object.fromEntries(new URLSearchParams(body));
      resolve(data);
    });
  });
}

function xmlEscape(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderReply(payload, userText) {
  const {
    severity = "minor",
    summary = "",
    next_steps = [],
    self_care = [],
    red_flags = [],
    citations = [],
    disclaimer = "This is general information, not a medical diagnosis. Seek medical care if you’re worried.",
  } = payload || {};

  const sevEmoji =
    severity === "emergency" ? "⛔"
    : severity === "moderate" ? "⚠️"
    : "ℹ️";

  const bullets = (arr = []) => arr.map((x) => `• ${x}`).join("\n");

  let txt =
`${sevEmoji} *Assessment:* ${severity.toUpperCase()}
${summary ? `\n${summary}\n` : ""}${
next_steps?.length ? `\n*Next steps:*\n${bullets(next_steps)}\n` : ""
}${self_care?.length ? `*Self-care:*\n${bullets(self_care)}\n` : ""}${
red_flags?.length ? `*Watch for these red flags:*\n${bullets(red_flags)}\n` : ""
}${citations?.length ? `_Sources:_ ${citations.join(", ")}\n` : ""}_${disclaimer}_`;

  return txt.slice(0, 1500);
}

// ---- OpenAI call ----
async function askOpenAI(userText) {
  const system = `
You are a careful, supportive health assistant for seniors on WhatsApp.
ALWAYS be conservative with risk. Never give a definitive diagnosis.
Return a STRICT JSON object only (no prose) with keys:
{
 "severity": "minor|moderate|emergency",
 "summary": "1-2 line plain-language impression",
 "next_steps": ["clear, safe actions (time-bound)"],
 "self_care": ["simple home care tips if appropriate"],
 "red_flags": ["specific warning signs to seek urgent care"],
 "citations": ["short trusted sources e.g., WHO, CDC"],
 "disclaimer": "concise disclaimer"
}
Rules:
- If age >=60 or has chronic disease terms (diabetes, BP, heart, kidney, COPD, cancer, pregnancy), bias to higher caution.
- If symptoms suggest time-sensitive danger (chest pain, stroke signs, severe breathing trouble, heavy bleeding), set severity="emergency" and advise immediate medical attention.
- Keep sentences simple and friendly. Use neutral, non-alarming tone.
  `;

  const user = `
User message (free text):
${userText}

If the text is not a health question, politely say you only give general health info and encourage contacting a clinician for concerns.
`;

  const resp = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system.trim() },
        { role: "user", content: user.trim() }
      ],
      temperature: 0.2,
    }),
  });

  if (!resp.ok) {
    const t = await resp.text();
    console.error("OpenAI API HTTP Error:", resp.status, t);
    throw new Error(`OpenAI error: ${resp.status} ${t}`);
  }

  const data = await resp.json();
  console.log("OpenAI API Raw Response:", JSON.stringify(data, null, 2));

  const text = data.choices?.[0]?.message?.content || "{}";

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("JSON Parse Error:", err, "LLM Output:", text);
    return {
      severity: "moderate",
      summary: "I had trouble parsing your message. Please restate the main symptoms, when they started, and any key history (age, conditions, meds).",
      next_steps: ["If symptoms are severe or worsening, seek in-person care promptly."],
      self_care: ["Stay hydrated and rest."],
      red_flags: ["Severe chest pain", "Severe shortness of breath", "Confusion", "Fainting"],
      citations: ["WHO", "CDC"],
      disclaimer: "This is general information, not a diagnosis.",
    };
  }
}

// ---- Vercel handler ----
export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const form = await parseForm(req);
  const userText = (form.Body || "").toString().trim();

  if (!userText) {
    const msg = "Hi! I can help with general health guidance. Tell me your main symptom, when it started, your age, and any long-term conditions or medicines.";
    const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(msg)}</Message></Response>`;
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(xml);
    return;
  }

  try {
    const ai = await askOpenAI(userText);
    const reply = renderReply(ai, userText);
    const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(reply)}</Message></Response>`;
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(xml);
  } catch (err) {
    console.error("Handler Error:", err);
    const fallback = "Sorry—I couldn’t process that right now. If this is urgent, please seek medical care immediately.";
    const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(fallback)}</Message></Response>`;
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(xml);
  }
}
