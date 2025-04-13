import React, { useState, useEffect, useRef } from 'react';
import '../styles/AudioPlayer.css';

const AudioPlayer = ({ audioUrl, landmarkName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  
  // Set up audio element
  useEffect(() => {
    const audio = audioRef.current;
    
    // Event listeners
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', onEnded);
    
    // Clean up event listeners
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioRef]);
  
  // Play/pause audio
  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Format time in minutes and seconds
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  
  // Handle slider change
  const handleTimeChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  
  return (
    <div className="audio-player">
      <h3 className="audio-title">Audio Narration</h3>
      
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="player-controls">
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        
        <div className="time-controls">
          <span className="current-time">{formatTime(currentTime)}</span>
          <input 
            type="range"
            className="time-slider"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimeChange}
            step="0.01"
          />
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="audio-info">
        <p>Narration for: {landmarkName}</p>
      </div>
    </div>
  );
};

export default AudioPlayer;
