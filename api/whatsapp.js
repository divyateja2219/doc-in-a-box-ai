import { parse } from 'querystring';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests are allowed");
  }

  let bodyData;import { parse } from 'querystring';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests are allowed");
  }

  let bodyData = {};

  try {
    // ✅ Properly handle x-www-form-urlencoded content (from Twilio)
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawBody = Buffer.concat(buffers).toString();
      bodyData = parse(rawBody);
    } else {
      bodyData = req.body;
    }

    const { Body } = bodyData;
    console.log("📩 Incoming user message:", Body);

    if (!Body || typeof Body !== "string") {
      return res.status(400).send("Missing or invalid 'Body' in request");
    }

    // 🔐 Check for missing API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ Missing OPENAI_API_KEY in environment variables");
      return res.status(500).send(`<Response><Message>Server config error</Message></Response>`);
    }

    // 🧠 OpenAI API Call
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
    console.log("🧠 OpenAI full response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("❌ OpenAI error:", data.error);
      return res.status(200).send(`<Response><Message>AI error: ${data.error.message}</Message></Response>`);
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("⚠️ No valid reply from OpenAI");
      return res.status(200).send(`
        <Response>
          <Message>Sorry, I couldn’t understand that. Please try again later.</Message>
        </Response>
      `);
    }

    // 🛡️ Escape any XML-sensitive characters
    const safeReply = reply
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    res.setHeader("Content-Type", "text/xml");
    return res.status(200).send(`<Response><Message>${safeReply}</Message></Response>`);

  } catch (error) {
    console.error("💥 Server Error:", error);
    res.setHeader("Content-Type", "text/xml");
    return res.status(200).send(`
      <Response>
        <Message>Sorry, something went wrong on our side.</Message>
      </Response>
    `);
  }
}


  // ✅ Properly parse Twilio's x-www-form-urlencoded body
  if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const rawBody = Buffer.concat(buffers).toString();
    bodyData = parse(rawBody);
  } else {
    bodyData = req.body;
  }

  const { Body } = bodyData;
  console.log("📩 Received Body:", Body);

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
    console.log("🧠 OpenAI full response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("⚠️ Missing reply from OpenAI:", data);
      res.setHeader("Content-Type", "text/xml");
      return res.status(200).send(`
        <Response>
          <Message>Sorry, I couldn’t understand that. Please try again later.</Message>
        </Response>
      `);
    }

    // 🛡️ Escape XML characters
    const safeReply = reply
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    res.setHeader("Content-Type", "text/xml");
    return res.status(200).send(`
      <Response>
        <Message>${safeReply}</Message>
      </Response>
    `);
  } catch (error) {
    console.error("💥 Server Error:", error);
    res.setHeader("Content-Type", "text/xml");
    return res.status(200).send(`
      <Response>
        <Message>Sorry, something went wrong on our side.</Message>
      </Response>
    `);
  }
}
