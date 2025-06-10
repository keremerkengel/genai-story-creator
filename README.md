# ✨ DreamScribe

🎙️ Yapay zeka destekli hikaye üretim ve seslendirme aracı.  
Kendi hikayeni oluştur, ister oku ister dinle!

## 🚀 Canlı Demo
[https://genai-story-creator.vercel.app]

---

## 🧠 Özellikler

- 🚀 **Groq LLM API** ile özgün hikayeler oluşturma
- ✍️ Kullanıcıdan alınan tür, karakter ve özet bilgilerinden hikaye üretimi
- 🔉 İsteğe bağlı olarak **Text-to-Speech (TTS)** desteği
- 🎨 Modern ve responsive React tasarımı
- 🌐 Frontend & Backend canlı yayında

---

## 🛠️ Kullanılan Teknolojiler

| Katman      | Teknoloji             |
|-------------|------------------------|
| Frontend    | React, Vite, Vercel    |
| Backend     | Node.js, Express, Render |
| LLM API     | Groq (Mixtral modeli)  |
| TTS (opsiyonel) | Web Speech API      |

---

## 📦 Kurulum (Lokal Geliştirme)

### 1. Repoyu Klonla

```bash
git clone https://github.com/keremerkengel/genai-story-creator.git
cd genai-story-creator
```

### 2. Ortam Değişkeni Ayarla

`server/.env` dosyası oluştur ve içine şu satırı yaz:

```
GROQ_API_KEY=gsk_xxx...
```

### 3. Sunucuyu Başlat

```bash
cd server
npm install
node index.js
```

### 4. Frontend'i Başlat

```bash
cd ../client
npm install
npm run dev
```

---

## 📂 Proje Yapısı

```
genai-story-creator/
├── client/      → React frontend
├── server/      → Node.js + Express backend
└── README.md    → Bu dosya
```

---

## 🧑‍💻 Geliştirici

👤 [Kerem Erkengel](https://github.com/keremerkengel)  
📩 Geri bildirim veya öneriler için iletişime geçebilirsin!

---

## 🪄 İlhamla Yaz, Zekayla Oluştur — DreamScribe
