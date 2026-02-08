import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (
    query: string,
    mode: "keyword" | "semantic" | "hybrid",
    k: number,
  ) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"keyword" | "semantic" | "hybrid">("hybrid");
  const [k, setK] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, mode, k);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="search-input"
          disabled={isLoading}
        />
        <div className="search-controls">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="search-select"
            disabled={isLoading}
          >
            <option value="keyword">Keyword</option>
            <option value="semantic">Semantic</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <select
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="search-select"
            disabled={isLoading}
          >
            <option value={5}>5 results</option>
            <option value={10}>10 results</option>
            <option value={20}>20 results</option>
          </select>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
