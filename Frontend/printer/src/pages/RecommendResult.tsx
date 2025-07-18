import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Recommend.css";

const RecommendResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const inkProperties = location.state?.inkProperties;
  const nozzle = location.state?.nozzle;
  const desiredDroplet = location.state?.desiredDroplet;

  if (!result) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
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

  // Helper function to render categorized data in text boxes
  const renderDataSection = (data: any, title: string) => {
    if (!data || typeof data !== "object") {
      return (
        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>{title}</h4>
          <textarea
            value="No data available"
            readOnly
            style={{
              width: "100%",
              height: "120px",
              maxHeight: "200px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "#ff9500",
              fontSize: "14px",
              fontFamily: "monospace",
              resize: "none",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          />
        </div>
      );
    }

    return (
      <div style={{ marginBottom: "1rem" }}>
        <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>{title}</h4>
        <textarea
          value={Object.entries(data)
            .map(
              ([key, value]) => `${key.replace(/_/g, " ")}: ${String(value)}`
            )
            .join("\n")}
          readOnly
          style={{
            width: "100%",
            height: "120px",
            maxHeight: "200px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#2a2a2a",
            color: "#fff",
            fontSize: "14px",
            fontFamily: "monospace",
            resize: "none",
            overflowY: "auto",
            boxSizing: "border-box",
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
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        padding: "2rem 2rem 2rem 2rem",
      }}
    >
      <div
        className="recommend-glass"
        style={{
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <h2 className="recommend-title" style={{ marginBottom: "1.5rem" }}>
          Recommendation Result
        </h2>

        {/* Initial Waveform Parameters */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>
            📈 Initial Waveform Parameters
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {initialWaveform && typeof initialWaveform === "object" ? (
              <>
                {initialWaveform.velocity !== undefined && (
                  <div>
                    <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                      Velocity
                    </h4>
                    <input
                      type="text"
                      value={`${initialWaveform.velocity} m/s`}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#2a2a2a",
                        color: "#fff",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                )}
                {initialWaveform.frequency !== undefined && (
                  <div>
                    <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                      Frequency
                    </h4>
                    <input
                      type="text"
                      value={`${initialWaveform.frequency} Hz`}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#2a2a2a",
                        color: "#fff",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                )}
                {initialWaveform.amplitude !== undefined && (
                  <div>
                    <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                      Amplitude
                    </h4>
                    <input
                      type="text"
                      value={`${initialWaveform.amplitude} V`}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        backgroundColor: "#2a2a2a",
                        color: "#fff",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                )}
                {/* Render any additional waveform parameters */}
                {Object.entries(initialWaveform)
                  .filter(
                    ([key]) =>
                      !["velocity", "frequency", "amplitude"].includes(key)
                  )
                  .map(([key, value]) => (
                    <div key={key}>
                      <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                        {key.replace(/_/g, " ")}
                      </h4>
                      <input
                        type="text"
                        value={String(value)}
                        readOnly
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #444",
                          backgroundColor: "#2a2a2a",
                          color: "#fff",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                  ))}
              </>
            ) : (
              <div style={{ gridColumn: "1 / -1" }}>
                <textarea
                  value="No initial waveform data available"
                  readOnly
                  style={{
                    width: "100%",
                    height: "80px",
                    maxHeight: "120px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    backgroundColor: "#2a2a2a",
                    color: "#ff9500",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    resize: "none",
                    overflowY: "auto",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Printability Analysis */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>🧪 Printability Analysis</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {printabilityCheck && typeof printabilityCheck === "object" ? (
              <>
                <div>
                  <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                    Ohnesorge Number
                  </h4>
                  <input
                    type="text"
                    value={String(printabilityCheck.ohnesorge)}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #444",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      fontSize: "16px",
                    }}
                  />
                </div>
                <div>
                  <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                    Reynolds Number
                  </h4>
                  <input
                    type="text"
                    value={String(printabilityCheck.reynolds)}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #444",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      fontSize: "16px",
                    }}
                  />
                </div>
                <div>
                  <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                    Weber Number
                  </h4>
                  <input
                    type="text"
                    value={String(printabilityCheck.weber)}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #444",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      fontSize: "16px",
                    }}
                  />
                </div>
                {printabilityCheck.warnings &&
                  Array.isArray(printabilityCheck.warnings) &&
                  printabilityCheck.warnings.length > 0 && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                        Warnings
                      </h4>
                      <textarea
                        value={printabilityCheck.warnings.join("\n")}
                        readOnly
                        style={{
                          width: "100%",
                          height: "100px",
                          maxHeight: "150px",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #444",
                          backgroundColor: "#2a2a2a",
                          color: "#ff9500",
                          fontSize: "14px",
                          fontFamily: "monospace",
                          resize: "none",
                          overflowY: "auto",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  )}
              </>
            ) : (
              <div style={{ gridColumn: "1 / -1" }}>
                <textarea
                  value="No printability check data available"
                  readOnly
                  style={{
                    width: "100%",
                    height: "80px",
                    maxHeight: "120px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    backgroundColor: "#2a2a2a",
                    color: "#ff9500",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    resize: "none",
                    overflowY: "auto",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Predicted Droplet Properties */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>
            💧 Predicted Droplet Properties
          </h3>
          {renderDataSection(predictedDroplet, "Droplet Characteristics")}
        </div>

        {/* Stability Assessment */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>📊 Stability Assessment</h3>
          <div>
            <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
              Stability Status
            </h4>
            <input
              type="text"
              value={
                isStable !== undefined && isStable !== null
                  ? isStable
                    ? "Stable Droplet"
                    : "Unstable Droplet"
                  : "No stability data available"
              }
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#2a2a2a",
                color:
                  isStable !== undefined && isStable !== null
                    ? isStable
                      ? "#90EE90"
                      : "#ff6b6b"
                    : "#ff9500",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>

        {/* Final Recommendations */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>🎯 Final Recommendations</h3>
          {finalRecommendation && typeof finalRecommendation === "object" ? (
            <>
              {finalRecommendation.waveform &&
                renderDataSection(
                  finalRecommendation.waveform,
                  "Recommended Waveform Parameters"
                )}
              {finalRecommendation.droplet &&
                renderDataSection(
                  finalRecommendation.droplet,
                  "Recommended Droplet Properties"
                )}
            </>
          ) : (
            <div>
              <textarea
                value="No final recommendation data available"
                readOnly
                style={{
                  width: "100%",
                  height: "80px",
                  maxHeight: "120px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  backgroundColor: "#2a2a2a",
                  color: "#ff9500",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  resize: "none",
                  overflowY: "auto",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            className="recommend-button"
            onClick={() =>
              navigate("/feedback", {
                state: {
                  result,
                  inkProperties,
                  nozzle,
                  desiredDroplet,
                },
              })
            }
          >
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendResult;
