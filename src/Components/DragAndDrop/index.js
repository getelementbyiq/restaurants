import React, { useState, useRef } from "react";

const DragAndDrop = ({ onDrop }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
      onDrop(files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        backdropFilter: "blur(7.5px)",
        background: isDraggingOver
          ? "rgba(95, 214, 221, 0.50)"
          : "rgba(95, 214, 221, 0.90)" || selectedFile
          ? "rgba(95, 214, 221, 0.50)"
          : "rgba(95, 214, 221, 0.90)",
        borderRadius: "4px 28px 28px 28px",
        width: "100%",
        height: "95px",
        marginBottom: "8px",
        cursor: "grab",
        zIndex: 1,
      }}
    >
      {selectedFile ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p> {selectedFile.name}</p>
        </div>
      ) : isDraggingOver ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Drop your files here
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Drag and drop files here
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
