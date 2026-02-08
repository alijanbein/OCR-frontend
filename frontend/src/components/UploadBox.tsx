import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";

interface UploadBoxProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onUpload, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);

  const showError = (message: string) => {
    Swal.fire({
      title: "Invalid File",
      text: message,
      icon: "error",
      background: "#242424",
      color: "#fff",
      confirmButtonColor: "#3085d6",
    });
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type === "application/pdf") {
          onUpload(file);
        } else {
          showError("Please upload a valid PDF file.");
        }
      }
    },
    [onUpload],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        onUpload(file);
      } else {
        showError("Please upload a valid PDF file.");
        // Reset input so user can try again
        e.target.value = "";
      }
    }
  };

  return (
    <div
      className={`upload-box ${dragActive ? "active" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        accept="application/pdf"
        onChange={handleChange}
        disabled={isUploading}
        style={{ display: "none" }}
      />
      <label htmlFor="file-upload" className="upload-label">
        <div className="upload-icon">📄</div>
        <p>Drag & Drop your PDF here or click to browse</p>
        <button className="btn-primary" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Select File"}
        </button>
      </label>
    </div>
  );
};

export default UploadBox;
