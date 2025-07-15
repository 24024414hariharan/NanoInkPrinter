import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Recommend.css";

const Feedback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure state values safely
  const { result, inkProperties, nozzle, desiredDroplet } = location.state || {};

  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (
      !rating ||
      !comments ||
      !inkProperties ||
      !nozzle ||
      !desiredDroplet ||
      !result?.finalRecommendation?.waveform ||
      !result?.finalRecommendation?.droplet
    ) {
      setMessage("All fields are required and recommendation data must be present.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        rating,
        comments,
        inkProperties,
        nozzle,
        desiredDroplet,
        waveform: result.finalRecommendation.waveform,
        droplet: result.finalRecommendation.droplet,
      };

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE}/recommend/feedback`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to feedback result page with returned data
      navigate("/recommend/feedback-result", {
        state: { result: res.data },
      });
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="recommend-background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="recommend-glass" style={{ maxWidth: 600, width: "100%" }}>
        <h2 className="recommend-title">Submit Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <label>
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Select one</option>
              <option value="Good">Good</option>
              <option value="Too small">Too small</option>
              <option value="Too slow">Too slow</option>
              <option value="Unstable">Unstable</option>
            </select>
          </label>

          <label>
            Comments:
            <textarea
              placeholder="Enter any specific observations"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
              rows={4}
              style={{ resize: "vertical" }}
            />
          </label>

          {message && (
            <div className="feedback-message" style={{ marginTop: "1rem", color: "#ff6868" }}>
              {message}
            </div>
          )}

          <button type="submit" disabled={submitting} style={{ marginTop: "1.5rem" }}>
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
