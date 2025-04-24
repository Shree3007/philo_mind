const express= require("express")
const router =express.Router();
const {getChatInstance} = require ("../utils/gemini");

router.post('/chat', async (req, res) => {
    try {
      const { message } = req.body;
  
      if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
      }

      const chat = getChatInstance();

      if (!chat) {
        return res.status(503).json({ error: 'Chat instance not ready yet.' });
      }
  
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = await response.text();
  
      res.json({ response: text });
    } catch (err) {
      console.error('Error during chat:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

module.exports=router;





