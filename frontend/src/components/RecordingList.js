import React, { useState, useEffect } from 'react';
import { getRecordings, getRecordingUrl } from '../services/api';
import VideoPlayer from './VideoPlayer';

const RecordingList = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const response = await getRecordings();
      setRecordings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recordings');
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <div>Loading recordings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="recording-list">
      <h2>Recordings</h2>
      {recordings.length === 0 ? (
        <p>No recordings found</p>
      ) : (
        <div className="recordings">
          {recordings.map(recording => (
            <div key={recording.id} className="recording-item">
              <div className="recording-info">
                <h3>{recording.filename}</h3>
                <p>Size: {formatFileSize(recording.filesize)}</p>
                <p>Created: {formatDate(recording.createdAt)}</p>
              </div>
              <VideoPlayer 
                src={getRecordingUrl(recording.id)} 
                title={recording.filename}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordingList;