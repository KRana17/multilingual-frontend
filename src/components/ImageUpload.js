import React, { useState } from 'react';
import '../styles/ImageUpload.css';

const ImageUpload = ({ onImageUpload, onProcessImage, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setSelectedImage(URL.createObjectURL(file));
      onImageUpload(file);
    } else {
      alert('Please upload an image file');
    }
  };
  
  return (
    <div className="upload-container">
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="image-upload" 
          accept="image/*"
          onChange={handleChange}
          className="file-input"
        />
        <label htmlFor="image-upload" className="upload-label">
          {selectedImage ? (
            <img src={selectedImage} alt="Preview" className="image-preview" />
          ) : (
            <>
              <div className="upload-icon">📷</div>
              <div className="upload-text">
                <p>Drag and drop an image here, or click to select</p>
                <p className="upload-hint">Upload a photo of a landmark to identify it</p>
              </div>
            </>
          )}
        </label>
      </div>
      
      <button 
        className="process-button"
        onClick={onProcessImage}
        disabled={isLoading || !selectedImage}
      >
        {isLoading ? 'Processing...' : 'Identify Landmark'}
      </button>
    </div>
  );
};

export default ImageUpload;
