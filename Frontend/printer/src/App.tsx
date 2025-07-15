import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from './pages/Register';
import Recommend from './pages/Recommend';
import RecommendResult from "./pages/RecommendResult";
import Feedback from "./pages/Feedback";
import FeedbackResult from "./pages/FeedbackResult";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/recommend/result" element={<RecommendResult />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/recommend/feedback-result" element={<FeedbackResult />} />

      </Routes>
    </Router>
  );
};

export default App;
