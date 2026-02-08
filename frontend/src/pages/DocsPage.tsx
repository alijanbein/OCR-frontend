import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import type { DocumentListItem } from "../api/types";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

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

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#242424", // Match theme
      color: "#fff", // Match theme
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await api.deleteDocument(id);
      setDocs(docs.filter((d) => d.document_id !== id));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        background: "#242424",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Failed to delete document:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete document.",
        icon: "error",
        background: "#242424",
        color: "#fff",
      });
    }
  };

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
            <Link
              key={doc.document_id}
              to={`/docs/${doc.document_id}`}
              className="doc-card"
            >
              <div className="doc-icon">📄</div>
              <div className="doc-info">
                <h3>{doc.filename}</h3>
                <div className="doc-meta">
                  <span>{doc.pages_count} Pages</span>
                  <span>•</span>
                  <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(e, doc.document_id)}
                title="Delete Document"
              >
                <MdDelete />
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default DocsPage;
