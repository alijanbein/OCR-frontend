import React from "react";
import type { SearchResultItem } from "../api/types";
import { useNavigate } from "react-router-dom";

interface ResultCardProps {
  result: SearchResultItem;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    // Navigate to doc detail and scroll to page
    navigate(`/docs/${result.document_id}?page=${result.page_number}`);
    // Note: Scroll behavior might need to be handled in DocDetailPage based on query param
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <span className="result-filename">{result.filename}</span>
        <span className="result-page">Page {result.page_number}</span>
        <span className="result-score">Score: {result.score.toFixed(3)}</span>
      </div>
      <p className="result-snippet">...{result.snippet}...</p>
      <button onClick={handleOpen} className="btn-secondary btn-sm">
        Open Page
      </button>
    </div>
  );
};

export default ResultCard;
