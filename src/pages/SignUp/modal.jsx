import React from 'react';
import './modal.css'; // 引入样式文件

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="close-button">&times;</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;