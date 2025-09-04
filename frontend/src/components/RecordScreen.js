import React, { useState, useRef } from 'react';
import { uploadRecording } from '../services/api';

const RecordScreen = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const MAX_RECORDING_TIME = 180; // 3 minutes in seconds

  const startRecording = async () => {
    try {
      setError('');
      
      // Get screen stream
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' }
      });
      
      // Get microphone audio
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      
      // Combine streams
      const combinedStream = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...audioStream.getAudioTracks()
      ]);
      
      streamRef.current = combinedStream;
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9,opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      setRecordedChunks([]);
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks(prev => [...prev, e.data]);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Stop all tracks
        combinedStream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setRecording(true);
      
      // Start timer
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds++;
        setTimer(seconds);
        
        if (seconds >= MAX_RECORDING_TIME) {
          stopRecording();
        }
      }, 1000);
      
    } catch (err) {
      setError('Failed to start recording: ' + err.message);
      console.error('Recording error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadRecording = () => {
    if (recordedChunks.length === 0) return;
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `screen-recording-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadRecordingToServer = async () => {
    if (recordedChunks.length === 0) return;
    
    try {
      setUploading(true);
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const formData = new FormData();
      formData.append('video', blob, `screen-recording-${Date.now()}.webm`);
      
      const response = await uploadRecording(formData);
      setUploading(false);
      
      if (onRecordingComplete) {
        onRecordingComplete();
      }
      
      alert('Recording uploaded successfully!');
      setRecordedChunks([]);
      setTimer(0);
    } catch (err) {
      setUploading(false);
      setError('Failed to upload recording: ' + err.message);
    }
  };

  return (
    <div className="record-screen">
      <h2>Screen Recorder</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="controls">
        {!recording ? (
          <button onClick={startRecording} disabled={recording}>
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} disabled={!recording}>
            Stop Recording
          </button>
        )}
        
        <div className="timer">{formatTime(timer)}</div>
      </div>
      
      {recordedChunks.length > 0 && (
        <div className="post-recording">
          <button onClick={downloadRecording} disabled={uploading}>
            Download Recording
          </button>
          <button onClick={uploadRecordingToServer} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload to Server'}
          </button>
        </div>
      )}
      
      {timer >= MAX_RECORDING_TIME - 10 && timer < MAX_RECORDING_TIME && (
        <div className="warning">
          Recording will stop automatically in {MAX_RECORDING_TIME - timer} seconds
        </div>
      )}
    </div>
  );
};

export default RecordScreen;