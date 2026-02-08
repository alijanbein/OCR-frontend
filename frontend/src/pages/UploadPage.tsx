import React, { useState } from "react";
import UploadBox from "../components/UploadBox";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import { api } from "../api/client";
import type { UploadResponse } from "../api/types";
import { Link } from "react-router-dom";

const UploadPage: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const resp = await api.uploadDocument(file);
      setResult(resp);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container fade-in">
      <div className="header-center">
        <h1>Upload PDF Document</h1>
        <p className="subtitle">
          Drag and drop your PDF to start OCR and indexing.
        </p>
      </div>

      <div className="upload-section">
        <UploadBox onUpload={handleUpload} isUploading={uploading} />
      </div>

      {uploading && <Loader />}
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}

      {result && (
        <div className="upload-success card fade-in">
          <h2>Upload Successful!</h2>
          <div className="success-details">
            <p>
              <strong>Filename:</strong> {result.filename}
            </p>
            <p>
              <strong>Document ID:</strong> {result.document_id}
            </p>
            <p>
              <strong>Pages Extracted:</strong> {result.pages_count}
            </p>
          </div>
          <div className="actions">
            <Link to={`/docs/${result.document_id}`} className="btn-primary">
              Open Document
            </Link>
            <button onClick={() => setResult(null)} className="btn-secondary">
              Upload Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UploadPage;
