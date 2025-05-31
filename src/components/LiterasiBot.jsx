import React, { useState } from 'react';
import literasiData from '../assets/literasiData.json';

const LiterasiBot = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const keyword = input.toLowerCase();

    const matched = literasiData.find((item) =>
      keyword.includes(item.pertanyaan)
    );

    const botReply = matched
      ? matched.jawaban
      : 'Maaf, aku belum bisa menjawab pertanyaan itu. Coba pakai kata kunci lain ya 😊';

    setChat([...chat, userMessage, { sender: 'bot', text: botReply }]);
    setInput('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {chat.map((msg, idx) => (
          <div key={idx} style={{ ...styles.message, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? '#7a73d1' : '#eee', color: msg.sender === 'user' ? '#fff' : '#000' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Tanya sesuatu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>Kirim</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '600px',
    background: '#fafafa',
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '15px',
  },
  message: {
    padding: '10px 15px',
    borderRadius: '20px',
    maxWidth: '80%',
  },
  inputBox: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  sendButton: {
    padding: '10px 20px',
    background: '#7a73d1',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

export default LiterasiBot;
