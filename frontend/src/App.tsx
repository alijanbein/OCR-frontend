import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadPage from "./pages/UploadPage";
import DocsPage from "./pages/DocsPage";
import DocDetailPage from "./pages/DocDetailPage";
import SearchPage from "./pages/SearchPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/:id" element={<DocDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
