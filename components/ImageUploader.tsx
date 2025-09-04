
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/IconComponents';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].type.startsWith('image/')) {
        onImageUpload(e.dataTransfer.files[0]);
      }
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <div 
            className={`w-full max-w-2xl border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${isDragging ? 'border-cyan-400 bg-gray-800/50' : 'border-gray-600 hover:border-cyan-500'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <UploadIcon className="w-16 h-16 text-gray-500"/>
                <p className="text-xl font-semibold text-gray-300">Drag & drop your image here</p>
                <p className="text-gray-400">or</p>
                <label htmlFor="file-upload" className="cursor-pointer bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-500 transition-colors duration-300">
                    Browse Files
                </label>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
            </div>
            <p className="text-xs text-gray-500 mt-6">Supports JPEG, PNG, WEBP, and more.</p>
        </div>
    </div>
  );
};

export default ImageUploader;
