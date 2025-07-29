import React from 'react';
import { useLocation } from 'react-router-dom';
import './Recommend.css';
import { WaveformChart } from './waveformchart';

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

  const { waveform, droplet, isStable } = result.updatedRecommendation;

  const renderInputField = (label: string, value: string) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <label style={{ fontWeight: 500, color: '#fff' }}>{label}</label>
      <input
        type="text"
        readOnly
        value={value}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          width: '200px',
          background: '#f9f9f9',
          color: '#333',
          textAlign: 'right',
          fontSize: '16px',
          fontWeight: '500',
        }}
      />
    </div>
  );

  const renderDataSection = (data: any, title: string) => {
    if (!data || typeof data !== 'object') return null;

    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>{title}</h3>
        {Object.entries(data).map(([key, value]) =>
          renderInputField(key.replace(/_/g, ' '), String(value))
        )}
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
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '2rem',
      }}
    >
      <div
        className="recommend-glass"
        style={{
          maxWidth: '900px',
          width: '100%',
          padding: '3rem 2rem 2rem 2rem',
          marginTop: '2rem',
          boxSizing: 'border-box',
          height:'90vh',
          overflow: 'hidden',
          overflowY: 'auto'
        }}
      >
        <h2 className="recommend-title" style={{ marginBottom: '1.5rem' }}>
          🧠 Feedback-Driven Recommendation Result
        </h2>

        {/* Waveform Section with Chart */}
        {waveform && (
          <>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>
              📈 Recommended Waveform Parameters
            </h3>
            <div
              className="waveform-chart-container"
              style={{
                backgroundColor: '#1e1e1e',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              <WaveformChart waveformParams={waveform} />
            </div>
            {renderDataSection(waveform, '')}
          </>
        )}

        {/* Recommended Droplet */}
        {renderDataSection(droplet, '💧 Recommended Droplet Properties')}

        {/* Stability */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>
            📊 Stability Status
          </h3>
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
