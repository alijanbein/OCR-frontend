import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import type { DocumentDetailResponse } from "../api/types";
import PageViewer from "../components/PageViewer";
import Loader from "../components/Loader";

const DocDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [doc, setDoc] = useState<DocumentDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .getDocumentDetail(id)
      .then(setDoc)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (doc && pageParam) {
      setTimeout(() => {
        const el = document.getElementById(`page-${pageParam}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.classList.add("highlight-page");
          setTimeout(() => el.classList.remove("highlight-page"), 2000);
        }
      }, 500); // Delay to ensure render
    }
  }, [doc, searchParams]);

  if (loading)
    return (
      <div className="center-content">
        <Loader />
      </div>
    );
  if (error)
    return <div className="center-content error-text">Error: {error}</div>;
  if (!doc) return <div className="center-content">Document not found</div>;

  return (
    <div className="container fade-in">
      <div className="doc-header">
        <h1>{doc.filename}</h1>
        <span className="badge">{doc.pages.length} Pages</span>
      </div>
      <PageViewer pages={doc.pages} />
    </div>
  );
};

export default DocDetailPage;
