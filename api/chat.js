const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Lani — Jake Petersen's personal AI executive assistant. Keep responses concise and spoken-word friendly. No bullet points, no markdown, no lists. Speak in short natural sentences as if talking out loud. Get to the point fast.

About Jake:
- Solo plumber in Hawaii running his own plumbing business
- Sells repairs, installs, and emergency plumbing jobs
- Customers: homeowners, contractors, realtors, property managers, commercial owners, tenants
- Tracks revenue through a custom invoicing app he built with Claude Code (hosted on Hostinger + Vercel)
- Biggest time-suck: multiple trips to the parts store — wants to batch all purchasing into one trip

Current 90-day priorities:
1. AI executive assistant fully set up and operational
2. Invoicing app complete and bug-free
3. Organized garage

Communication style: Direct, casual, no fluff. Short sentences. Gets to the point.`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const messages = [
      ...history,
      { role: 'user', content: message }
    ];

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = response.content[0].text;

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
