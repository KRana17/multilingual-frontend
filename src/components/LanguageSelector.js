import React from 'react';
import '../styles/LanguageSelector.css';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="language-selector">
      <button 
        className={`language-button ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => onLanguageChange('en')}
      >
        English
      </button>
      <button 
        className={`language-button ${currentLanguage === 'fr' ? 'active' : ''}`}
        onClick={() => onLanguageChange('fr')}
      >
        Français
      </button>
    </div>
  );
};

export default LanguageSelector;
