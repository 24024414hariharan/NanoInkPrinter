import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Recommend.css';

const RecommendResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;


  if (!result) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
        No recommendation data found. Please submit the form first.
      </div>
    );
  }

  const {
    initialWaveform,
    printabilityCheck,
    predictedDroplet,
    isStable,
    finalRecommendation,
  } = result;

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
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '2rem',
      }}
    >
      <div className="recommend-glass" style={{ maxWidth: '900px' }}>
        <h2 className="recommend-title">Recommendation Result</h2>

        {/* Initial Waveform */}
        <h3>📈 Initial Waveform</h3>
        {initialWaveform && typeof initialWaveform === 'object' ? (
          <ul>
            {Object.entries(initialWaveform).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'orange' }}>No initial waveform data available</p>
        )}

        {/* Printability Check */}
        <h3>🧪 Printability Check</h3>
        {printabilityCheck && typeof printabilityCheck === 'object' ? (
          <ul>
            <li><strong>Ohnesorge:</strong> {String(printabilityCheck.ohnesorge)}</li>
            <li><strong>Reynolds:</strong> {String(printabilityCheck.reynolds)}</li>
            <li><strong>Weber:</strong> {String(printabilityCheck.weber)}</li>
            {printabilityCheck.warnings && Array.isArray(printabilityCheck.warnings) && printabilityCheck.warnings.length > 0 && (
              <li>
                <strong>Warnings:</strong>
                <ul>
                  {printabilityCheck.warnings.map((warn: string, idx: number) => (
                    <li key={idx}>{warn}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        ) : (
          <p style={{ color: 'orange' }}>No printability check data available</p>
        )}

        {/* Predicted Droplet */}
        <h3>💧 Predicted Droplet</h3>
        {predictedDroplet && typeof predictedDroplet === 'object' ? (
          <ul>
            {Object.entries(predictedDroplet).map(([key, val]) => (
              <li key={key}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {String(val)}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'orange' }}>No predicted droplet data available</p>
        )}

        {/* Stability */}
        <h3>📊 Stability</h3>
        {isStable !== undefined && isStable !== null ? (
          <p style={{ fontWeight: 'bold', color: isStable ? 'lightgreen' : 'red' }}>
            {isStable ? 'Stable Droplet' : 'Unstable Droplet'}
          </p>
        ) : (
          <p style={{ color: 'orange' }}>No stability data available</p>
        )}

        {/* Final Recommendation */}
        <h3>🎯 Final Recommendation</h3>
        {finalRecommendation && typeof finalRecommendation === 'object' ? (
          <>
            <div>
              <strong>Waveform:</strong>
              {finalRecommendation.waveform && typeof finalRecommendation.waveform === 'object' ? (
                <ul>
                  {Object.entries(finalRecommendation.waveform).map(([key, val]) => (
                    <li key={key}>
                      <strong>{key.replace(/_/g, ' ')}:</strong> {String(val)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'orange' }}>No waveform recommendation available</p>
              )}
            </div>
            <div>
              <strong>Droplet:</strong>
              {finalRecommendation.droplet && typeof finalRecommendation.droplet === 'object' ? (
                <ul>
                  {Object.entries(finalRecommendation.droplet).map(([key, val]) => (
                    <li key={key}>
                      <strong>{key.replace(/_/g, ' ')}:</strong> {String(val)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'orange' }}>No droplet recommendation available</p>
              )}
            </div>
          </>
        ) : (
          <p style={{ color: 'orange' }}>No final recommendation data available</p>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            className="recommend-button"
            onClick={() => navigate('/feedback', { state: result })}
          >
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendResult;