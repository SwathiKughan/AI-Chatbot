// pages/api/saveChat.js
import fs from 'fs';
import path from 'path';

// Ensure the directory exists
const chatsDir = path.join(process.cwd(), 'chats');
if (!fs.existsSync(chatsDir)) {
  fs.mkdirSync(chatsDir);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Log the request body to verify the data received
      console.log('Request Body:', req.body);

      // Validate that req.body is an array
      if (!Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).json({ error: 'Invalid chat data' });
      }

      // Generate a unique filename based on timestamp
      const timestamp = new Date().toISOString().replace(/[-:T]/g, '_');
      const filename = `chat_${timestamp}.txt`;

      // Define the path to save the file
      const filePath = path.join(chatsDir, filename);

      // Convert the chat data to a string
      const chatContent = req.body.map(msg => `${msg.type.toUpperCase()}: ${msg.text}`).join('\n');

      // Write chat data to the file
      fs.writeFileSync(filePath, chatContent);

      // Respond with success
      res.status(200).json({ message: 'Chat saved successfully' });
    } catch (error) {
      console.error('Error saving chat:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

