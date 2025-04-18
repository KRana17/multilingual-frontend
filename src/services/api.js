import axios from 'axios';

// API endpoint URLs
const API_BASE_URL = 'https://rlomz7vr1e.execute-api.us-east-1.amazonaws.com/Prod';
const UPLOAD_ENDPOINT = `${API_BASE_URL}/upload`;
const PROCESS_ENDPOINT = `${API_BASE_URL}/process`;

/**
 * Upload an image to S3 via API Gateway
 * @param {File} file - Image file to upload
 * @returns {Promise<Object>} - Upload result with imageKey and imageUrl
 */
export const uploadImage = async (file)  => {
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(file);
    
    // Prepare request body
    const requestBody = {
      image: base64Image,
      fileType: file.type
    };
    
    // Send request to upload endpoint
    const response = await axios.post(UPLOAD_ENDPOINT, requestBody);
    
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};

/**
 * Process an image to identify landmarks
 * @param {string} imageKey - S3 key of the uploaded image
 * @param {string} language - Language code (en or fr)
 * @returns {Promise<Object>} - Landmark information
 */
export const processImage = async (imageKey, language = 'en') => {
  try {
    // Prepare request body
    const requestBody = {
      imageKey,
      language
    };
    
    // Send request to process endpoint
    const response = await axios.post(PROCESS_ENDPOINT, requestBody);
    
    return response.data;
  } catch (error) {
    console.error('Error processing image:', error);
    
    if (error.response && error.response.status === 404) {
      throw new Error('No landmark detected in the image. Please try a different image.');
    }
    
    throw new Error('Failed to process image. Please try again.');
  }
};

/**
 * Convert a file to base64 string
 * @param {File} file - File to convert
 * @returns {Promise<string>} - Base64 string
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
