"use client";

import React, { useState, useRef } from "react";

function ImageUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviewUrls = [];
    const newSelectedFiles = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result);
        if (newPreviewUrls.length === files.length) {
          setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
          setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // To update the file input element, we need to clear and re-assign the remaining files.
    const newFiles = Array.from(fileInputRef.current.files).filter(
      (_, i) => i !== index
    );
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <div>
        {previewUrls.map((url, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <img
              src={url}
              alt={`Image Preview ${index + 1}`}
              style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
                marginBottom: "5px",
              }}
            />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
