import React from 'react';
import { useLocation } from 'react-router-dom';
import './Recommend.css';

const FeedbackResult: React.FC = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result || !result.updatedRecommendation) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        No updated recommendation available. Please return to the previous page.
      </div>
    );
  }

  const {
    waveform,
    droplet,
    isStable
  } = result.updatedRecommendation;

  const renderDataSection = (data: any, title: string) => {
    if (!data || typeof data !== 'object') {
      return null;
    }

    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>{title}</h3>
        <textarea
          value={Object.entries(data)
            .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${String(value)}`)
            .join('\n')}
          readOnly
          style={{
            width: '100%',
            height: '140px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #444',
            backgroundColor: '#2a2a2a',
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'monospace',
            resize: 'none',
          }}
        />
      </div>
    );
  };

  return (
    <div
      className="recommend-background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="recommend-glass" style={{ maxWidth: '900px', width: '100%' }}>
        <h2 className="recommend-title">Updated Recommendation</h2>

        {renderDataSection(waveform, 'Recommended Waveform Parameters')}
        {renderDataSection(droplet, 'Recommended Droplet Properties')}

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>📊 Stability Status</h3>
          <input
            type="text"
            value={isStable ? 'Stable Droplet' : 'Unstable Droplet'}
            readOnly
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #444',
              backgroundColor: '#2a2a2a',
              color: isStable ? '#90ee90' : '#ff6b6b',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackResult;
