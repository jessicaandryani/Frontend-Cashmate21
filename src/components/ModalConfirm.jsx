import React from 'react';

const ModalConfirm = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "✅ Hapus",
  cancelLabel = "❌ Batal",
  titleColor = '#333',
  messageColor = '#555'
}) => {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: '10px', color: titleColor }}>{title}</h2>
        <p style={{ marginBottom: '20px', color: messageColor }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={onCancel} style={cancelButtonStyle}>{cancelLabel}</button>
          <button onClick={onConfirm} style={confirmButtonStyle}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
};


const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '30px 40px',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
  textAlign: 'center',
};

const cancelButtonStyle = {
  backgroundColor: '#ccc',
  color: '#333',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const confirmButtonStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default ModalConfirm;
