import React, { useState } from 'react';

function App() {
  const [genre, setGenre] = useState('');
  const [character, setCharacter] = useState('');
  const [summary, setSummary] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    setStory('');

    try {
      const response = await fetch('http://localhost:5000/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre, character, summary })
      });

      const data = await response.json();
      setStory(data.story);
    } catch (error) {
      console.error('Hikaye alınamadı:', error);
      setStory('❌ Bir hata oluştu.');
    }

    setLoading(false);
  };

  const speak = (text) => {
    if (!text) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: '#f8fafc',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerContainerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  };

  const subtitleStyle = {
    color: '#64748b',
    fontSize: '1.1rem',
    fontWeight: '400'
  };

  const mainCardStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '2.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: '0 auto',
    border: '1px solid #e2e8f0'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
    gap: '2rem'
  };

  const inputSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const labelStyle = {
    color: '#374151',
    fontWeight: '600',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    color: '#374151',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const buttonStyle = {
    width: '100%',
    background: loading ? '#9ca3af' : '#3b82f6',
    color: 'white',
    fontWeight: '600',
    padding: '0.875rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const storyContainerStyle = {
    background: '#f9fafb',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column'
  };

  const storyHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    color: '#374151',
    fontSize: '1.1rem',
    fontWeight: '600'
  };

  const storyContentStyle = {
    color: '#4b5563',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    maxHeight: '320px',
    overflowY: 'auto',
    flex: 1
  };

  const placeholderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    color: '#9ca3af',
    flexDirection: 'column',
    gap: '1rem'
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '2rem',
    color: '#6b7280',
    fontSize: '0.9rem'
  };

  const spinnerStyle = {
    width: '1.2rem',
    height: '1.2rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          input::placeholder, textarea::placeholder {
            color: #9ca3af;
          }
          input:focus, textarea:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          button:hover:not(:disabled) {
            background-color: #2563eb;
          }
          @media (max-width: 768px) {
            .grid { grid-template-columns: 1fr; }
            .title { font-size: 2rem; }
            .container { padding: 1rem; }
            .main-card { padding: 2rem; }
          }
        `}
      </style>

      <div style={headerContainerStyle}>
        <h1 style={titleStyle}>Hikaye Oluşturucu</h1>
        <p style={subtitleStyle}>Yapay zeka ile kendi hikayenizi yaratın</p>
      </div>

      <div style={mainCardStyle}>
        <div style={gridStyle} className="grid">
          <div style={inputSectionStyle}>
            <div>
              <label style={labelStyle}>Hikaye Türü</label>
              <input
                type="text"
                placeholder="örn. bilim kurgu, romantik, macera"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Ana Karakter</label>
              <input
                type="text"
                placeholder="örn. Zara, cesur pilot"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Konu Özeti</label>
              <textarea
                placeholder="Hikayenizin ana konusunu kısaca açıklayın..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                style={textareaStyle}
              />
            </div>

            <button
              onClick={generateStory}
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? (
                <>
                  <div style={spinnerStyle}></div>
                  <span>Hikaye Oluşturuluyor...</span>
                </>
              ) : (
                <span>Hikaye Oluştur</span>
              )}
            </button>
          </div>

          <div style={storyContainerStyle}>
            {story ? (
              <>
                <div style={storyHeaderStyle}>
                  <span>📖</span>
                  <span>Hikayeniz</span>
                </div>
                <div style={storyContentStyle}>{story}</div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button
                    onClick={() => speak(story)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    🔊 Seslendir
                  </button>

                  <button
                    onClick={stopSpeaking}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    🔇 Durdur
                  </button>
                </div>
              </>
            ) : (
              <div style={placeholderStyle}>
                <div style={{ fontSize: '3rem', opacity: 0.5 }}>📚</div>
                <div>
                  <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Hikayeniz burada görünecek</p>
                  <p style={{ fontSize: '0.9rem' }}>Formu doldurup "Hikaye Oluştur" butonuna tıklayın</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={footerStyle}>
        <b>Kerem Erkengel tarafından geliştirildi</b>
      </div>
    </div>
  );
}

export default App;