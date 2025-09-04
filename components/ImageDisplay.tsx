import React, { useRef } from 'react';
import Spinner from './Spinner';

interface ImageDisplayProps {
  originalImage: string;
  editedImage: string | null;
  isLoading: boolean;
  onImageClick: (pos: { x: number; y: number }) => void;
  clickMarker: { x: number; y: number } | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedImage, isLoading, onImageClick, clickMarker }) => {
  const originalImageContainerRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if(!originalImageContainerRef.current) return;
      const rect = originalImageContainerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      onImageClick({ x, y });
  };
  
  return (
    <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-300 mb-3">Original</h2>
        <div 
          ref={originalImageContainerRef}
          className="aspect-w-1 aspect-h-1 w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg relative cursor-crosshair group"
          onClick={handleContainerClick}
        >
          <img src={originalImage} alt="Original" className="w-full h-full object-contain" />
          {clickMarker && (
              <div className="absolute w-6 h-6 border-2 border-cyan-400 rounded-full bg-cyan-400/20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ top: clickMarker.y, left: clickMarker.x }}></div>
          )}
           <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             <p className="text-white font-semibold">Click to make a selective edit</p>
           </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-300 mb-3">Edited</h2>
        <div className="aspect-w-1 aspect-h-1 w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg relative">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
              <Spinner />
            </div>
          )}
          <img 
            src={editedImage || originalImage} 
            alt="Edited" 
            className={`w-full h-full object-contain transition-opacity duration-500 ${!editedImage ? 'opacity-30' : 'opacity-100'}`} 
          />
          {!editedImage && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Your edited image will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;