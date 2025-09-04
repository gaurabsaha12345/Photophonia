
import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, ResetIcon, NewImageIcon, DownloadIcon, UndoIcon } from '../icons/IconComponents';

interface MainActionsProps {
  onEdit: (prompt: string) => void;
  onReset: () => void;
  onUndo: () => void;
  onNewImage: () => void;
  isLoading: boolean;
  hasEdits: boolean;
  editedImage: string | null;
}

const MainActions: React.FC<MainActionsProps> = ({ onEdit, onReset, onUndo, onNewImage, isLoading, hasEdits, editedImage }) => {
  const [prompt, setPrompt] = useState('');
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setIsDownloadMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onEdit(prompt.trim());
      setPrompt('');
    }
  };

  const handleDownload = (format: 'image/png' | 'image/jpeg' | 'image/webp') => {
    if (!editedImage) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(format, 0.92);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `photophonia-edited.${format.split('/')[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = editedImage;
    setIsDownloadMenuOpen(false);
  };
  
  return (
    <div className="w-full h-full bg-gray-800/60 p-4 rounded-xl border border-gray-700 shadow-2xl flex flex-col">
      <form onSubmit={handlePromptSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <SparklesIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Or describe your custom edit..."
            className="w-full bg-gray-900 border border-gray-600 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="bg-cyan-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
        >
          Generate
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700">
        <button onClick={onNewImage} className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
          <NewImageIcon className="w-4 h-4" /> New Image
        </button>
        <button onClick={onUndo} disabled={!hasEdits || isLoading} className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors">
          <UndoIcon className="w-4 h-4" /> Undo
        </button>
        <button onClick={onReset} disabled={!hasEdits || isLoading} className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors">
          <ResetIcon className="w-4 h-4" /> Reset
        </button>
        
        <div className="relative ml-auto" ref={downloadMenuRef}>
          <button onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)} disabled={!hasEdits || isLoading} className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 hover:bg-green-500 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <DownloadIcon className="w-4 h-4" /> Download
          </button>
          {isDownloadMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-20">
              <ul className="py-1">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleDownload('image/png'); }} className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Download as PNG</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleDownload('image/jpeg'); }} className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Download as JPEG</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleDownload('image/webp'); }} className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Download as WEBP</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainActions;
