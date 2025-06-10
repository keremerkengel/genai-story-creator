const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

// 🔧 CORS Ayarı — Vercel frontend'in adresini ekledik
app.use(cors({
  origin: ['http://localhost:5173', 'https://genai-story-creator.vercel.app']
}));

app.use(express.json());

// Groq API ayarları
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/generate-story', async (req, res) => {
  const { genre, character, summary } = req.body;

  const prompt = `
Aşağıda verilen bilgilerle TÜRKÇE olarak çok kısa bir hikaye yazmanı istiyorum. Hikaye giriş, gelişme ve sonuç bölümlerinden oluşsun fakat prompt çıktısında buna yer verme. Anlatım dili sade, yaratıcı ve akıcı olsun.

Tür: ${genre}
Karakter: ${character}
Konu: ${summary}

Lütfen sadece hikayeyi yaz. Başka açıklama verme.
`;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`
        }
      }
    );

    const story = response.data.choices[0].message.content;
    res.json({ story });
  } catch (error) {
    console.error('Groq API Hatası:', error.response?.data || error.message);
    res.status(500).send('❌ Hikaye oluşturulamadı (Groq).');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Sunucu çalışıyor: http://localhost:${PORT}`);
});
