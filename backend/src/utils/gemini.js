const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let chatInstance = null;
//console.log("Loaded API Key:", process.env.GEMINI_API_KEY);


async function setupChat() {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  chatInstance = await model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });
}

setupChat();

function getChatInstance() {
  return chatInstance;
}

module.exports = {getChatInstance};
