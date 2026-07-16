import { useState, useRef } from "react";

export default function FileInput({
  label = "Upload File",
  accept = ".pdf,.docx",
  maxSizeMB = 4,
  onFileSelect,
  error,
}) {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    // Optional: Front-end size validation check
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert(`File is too large. Max allowed size is ${maxSizeMB}MB.`);
      return;
    }

    setSelectedFileName(file.name);
    onFileSelect(file);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Drag and drop event handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFileName("");
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
        {label}
      </label>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className="relative"
      >
        <label
          className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-150 ${
            dragActive
              ? "border-indigo-500 bg-indigo-50/50"
              : error
                ? "border-rose-300 bg-rose-50/30 hover:bg-rose-50/50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className="flex flex-col items-center justify-center p-4 text-center">
            {selectedFileName ? (
              // Selected File View State
              <div className="flex flex-col items-center space-y-1">
                <svg
                  className="w-8 h-8 text-indigo-500 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-xs font-semibold text-gray-950 truncate max-w-[250px]">
                  {selectedFileName}
                </p>
                <button
                  onClick={handleClear}
                  className="text-[10px] text-rose-500 hover:text-rose-700 hover:underline mt-1 font-bold uppercase tracking-wider focus:outline-none"
                >
                  Remove File
                </button>
              </div>
            ) : (
              // Empty State View
              <>
                <svg
                  className="w-6 h-6 mb-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-xs text-gray-600 font-medium">
                  Click to browse or drop file here
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  Supported: {accept} (Max {maxSizeMB}MB)
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleInputChange}
          />
        </label>
      </div>

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}
