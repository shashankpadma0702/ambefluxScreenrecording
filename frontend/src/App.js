import React, { useState } from 'react';
import RecordScreen from './components/RecordScreen';
import RecordingList from './components/RecordingList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('record');
  const [refreshList, setRefreshList] = useState(false);

  const handleRecordingComplete = () => {
    setRefreshList(prev => !prev);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Screen Recorder</h1>
        <nav>
          <button 
            className={activeTab === 'record' ? 'active' : ''}
            onClick={() => setActiveTab('record')}
          >
            Record
          </button>
          <button 
            className={activeTab === 'recordings' ? 'active' : ''}
            onClick={() => setActiveTab('recordings')}
          >
            My Recordings
          </button>
        </nav>
      </header>
      
      <main>
        {activeTab === 'record' ? (
          <RecordScreen onRecordingComplete={handleRecordingComplete} />
        ) : (
          <RecordingList key={refreshList} />
        )}
      </main>
    </div>
  );
}

export default App;