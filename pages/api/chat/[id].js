// pages/api/chat/[id].js
export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;  // Access the API key here
  const { message } = req.body;

  // Implement the logic to interact with ChatGPT API
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,  // Use the API key here
    },
    body: JSON.stringify({
      prompt: message,
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  res.status(200).json({ response: data.choices[0].text });
}
