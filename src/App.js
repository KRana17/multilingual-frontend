import React, { useState, useEffect } from 'react';
import './styles/App.css';
import ImageUpload from './components/ImageUpload';
import LanguageSelector from './components/LanguageSelector';
import LandmarkInfo from './components/LandmarkInfo';
import AudioPlayer from './components/AudioPlayer';
import { uploadImage, processImage } from './services/api';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageKey, setImageKey] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState('en');
  const [landmarkInfo, setLandmarkInfo] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (file) => {
    setImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
    setLandmarkInfo(null);
    setAudioUrl(null);
    setError(null);
  };

  const handleProcessImage = async () => {
    if (!imageFile) return;

    try {
      // Upload image
      setIsUploading(true);
      const uploadResult = await uploadImage(imageFile);
      setImageKey(uploadResult.imageKey);
      setIsUploading(false);

      // Process image
      setIsProcessing(true);
      const processResult = await processImage(uploadResult.imageKey, language);
      setLandmarkInfo(processResult);
      setAudioUrl(processResult.audioUrl);
      setIsProcessing(false);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    
    // If we already have a landmark, get info in the new language
    if (imageKey && landmarkInfo) {
      try {
        setIsProcessing(true);
        const processResult = await processImage(imageKey, newLanguage);
        setLandmarkInfo(processResult);
        setAudioUrl(processResult.audioUrl);
        setIsProcessing(false);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multilingual Virtual Tour Guide</h1>
        <LanguageSelector 
          currentLanguage={language} 
          onLanguageChange={handleLanguageChange} 
        />
      </header>

      <main className="App-main">
        <div className="upload-section">
          <ImageUpload 
            onImageUpload={handleImageUpload}
            onProcessImage={handleProcessImage}
            isLoading={isUploading || isProcessing}
          />
          
          {selectedImage && (
            <div className="image-preview">
              <img src={selectedImage} alt="Preview" />
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {landmarkInfo && (
          <div className="info-section">
            <LandmarkInfo 
              info={landmarkInfo} 
              language={language} 
            />
            
            {audioUrl && (
              <AudioPlayer 
                audioUrl={audioUrl} 
                landmarkName={landmarkInfo.landmarkName} 
              />
            )}
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>Powered by AWS Rekognition</p>
      </footer>
    </div>
  );
}

export default App;
