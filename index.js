import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

// Serve static files
app.use(express.static('public'));

const apiKey = '';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
};

// OpenAI API endpoint
app.post('/api/openai', bodyParser.json(), async (req, res) => {
  const message = req.body.message;
  const prompt = `${message}\n`;
  const apiUrl = `https://api.openai.com/v1/engines/text-davinci-002/completions`;
  console.log(prompt);
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        "prompt": "hello how are you",
        "temperature": 0.7,
        "max_tokens": 256,
        "top_p": 1,
        "frequency_penalty": 0.75,
        "presence_penalty": 0
      })
    });
    const data = await response.json();
    if (data.choices && data.choices[0].text) {
      const text = data.choices[0].text.trim();
      res.json({response: text});
    } else {
      throw new Error('No response from OpenAI API');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err.message});
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));


/* {
  "prompt": "Trade-related question: @prompt\n",
  "temperature": 0,
  "max_tokens": 256,
  "top_p": 1,
  "frequency_penalty": 0.75,
  "presence_penalty": 0
} */