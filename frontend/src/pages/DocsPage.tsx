import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import type { DocumentListItem } from "../api/types";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const DocsPage: React.FC = () => {
  const [docs, setDocs] = useState<DocumentListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDocuments()
      .then(setDocs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="container center-content">
        <Loader />
      </div>
    );

  return (
    <div className="container fade-in">
      <h1>Documents</h1>
      {docs.length === 0 ? (
        <div className="empty-state">
          <p>No documents found.</p>
          <Link to="/" className="btn-primary">
            Upload PDF
          </Link>
        </div>
      ) : (
        <div className="docs-grid">
          {docs.map((doc) => (
            <Link key={doc.id} to={`/docs/${doc.id}`} className="doc-card">
              <div className="doc-icon">📄</div>
              <div className="doc-info">
                <h3>{doc.filename}</h3>
                <div className="doc-meta">
                  <span>{doc.pages_count} Pages</span>
                  <span>•</span>
                  <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default DocsPage;
