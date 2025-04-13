import React from 'react';
import '../styles/LandmarkInfo.css'; // Assuming you have this CSS file

const LandmarkInfo = ({ info, language, imageUrl }) => {
  // Determine which language content to display
  const isEnglish = language === 'en';

  return (
    <div className="landmark-info-container">
      <div className="landmark-header">
        <h2 className="landmark-name">{info.landmarkName}</h2>
      </div>

      {imageUrl && (
        <div className="landmark-image-wrapper">
          <div className="landmark-image-container">
            <img src={imageUrl} alt={info.landmarkName} className="landmark-image" />
          </div>
        </div>
      )}

      <div className="landmark-content">
        <div className="landmark-details">
          <div className="landmark-location">
            <strong>{isEnglish ? 'Location:' : 'Emplacement:'}</strong> {info.location}
          </div>

          {info.yearBuilt && (
            <div className="landmark-year">
              <strong>{isEnglish ? 'Year Built:' : 'Année de construction:'}</strong> {info.yearBuilt}
            </div>
          )}
        </div>

        <div className="landmark-description">
          <p>{info.description}</p>
        </div>

        {info.interestingFacts && info.interestingFacts.length > 0 && (
          <div className="landmark-facts">
            <h3>{isEnglish ? 'Interesting Facts:' : 'Faits intéressants:'}</h3>
            <ul className="fact-list">
              {info.interestingFacts.map((fact, index) => (
                <li key={index} className="fact-item">{fact}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandmarkInfo;