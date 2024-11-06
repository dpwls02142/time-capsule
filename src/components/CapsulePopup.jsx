import React from 'react';
import '../styles/CapsulePopup.css';

const CapsulePopup = ({ capsule, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="popup-title">{capsule.title}</h2>
        <div className="popup-content">
          <p>{capsule.message}</p>
          {capsule.image && (
            <img 
            src={capsule.image} 
            alt={capsule.title} 
            className="popup-image" 
            style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CapsulePopup;