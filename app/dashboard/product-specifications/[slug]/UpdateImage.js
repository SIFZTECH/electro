import Image from "next/image";
import React, { useState, useRef } from "react";

function UpdateImageUploader({ register, errors, setValue }) {
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

  setValue("images", selectedFiles);

  return (
    <div className="col-span-2">
      <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
        Images
      </label>
      <div className="mt-1">
        <input
          {...register("images")}
          type="file"
          accept="image/*"
          multiple
          placeholder="Select your Images"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
        <div className="flex gap-2 items-start flex-wrap mt-2">
          {previewUrls.map((url, index) => (
            <>
              <Image
                key={index + 1}
                src={url}
                height={50}
                width={50}
                alt={`Image Preview ${index + 1}`}
                className="border border-gray-200"
              />
              <span
                className="text-sm font-serif btn-primary bg-gray-200 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </span>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpdateImageUploader;
