import Image from "next/image";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

function ImageUploader({ register, errors, setValue }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter((file) => file.type.startsWith("image"));

    if (validFiles.length === 0) {
      toast.error("Only Image files are allowed.");
    }
    processFiles(validFiles);
    setDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processFiles = (files) => {
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
    const newFiles = Array.from(fileInputRef.current.files).filter(
      (_, i) => i !== index
    );
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  };

  setValue("images", selectedFiles);

  return (
    <div className="col-span-2">
      <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
        Images
      </label>
      <div
        className={`mt-1 p-4 border-dashed border-2 ${
          dragOver ? "border-blue-600" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          {...register("images", {
            required: "This field must be filled",
          })}
          type="file"
          accept="image/*"
          id="images"
          multiple
          placeholder="Select your Images"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-color-primary file:text-white
          hover:file:bg-color-primary"
        />
        <div className="flex gap-2 items-start flex-wrap mt-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Image
                src={url}
                height={50}
                width={50}
                alt={`Image Preview ${index + 1}`}
                className="border border-gray-200"
              />
              <span
                className="text-sm font-serif btn-primary text-color-primary bg-gray-200 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </span>
            </div>
          ))}
        </div>

        {errors?.images && (
          <span className="text-red-500 text-sm">{errors.images.message}</span>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
