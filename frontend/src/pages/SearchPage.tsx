import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import { api } from "../api/client";
import type { SearchResponse } from "../api/types";

const SearchPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (q: string, mode: any, k: number) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await api.search(q, mode, k);
      setResults(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <h1>Search Documents</h1>
      <SearchBar onSearch={handleSearch} isLoading={loading} />

      {loading && (
        <div className="center-content">
          <Loader />
        </div>
      )}

      <div className="results-list">
        {results?.results.map((r, i) => (
          <ResultCard key={i} result={r} />
        ))}
        {hasSearched && !loading && results?.results.length === 0 && (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
