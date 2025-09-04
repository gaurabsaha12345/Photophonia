
import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon } from './icons/IconComponents';

interface SelectiveEditPopoverProps {
  position: { top: number; left: number };
  onSubmit: (prompt: string) => void;
  onClose: () => void;
}

const SelectiveEditPopover: React.FC<SelectiveEditPopoverProps> = ({ position, onSubmit, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [blur, setBlur] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    setTimeout(() => document.addEventListener("mousedown", handleClickOutside), 0);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  const handleBlurChangeEnd = (valueStr: string) => {
    const value = parseInt(valueStr, 10);
    if (value === 0) return;

    let intensity = '';
    if (value <= 33) intensity = 'light';
    else if (value <= 66) intensity = 'moderate';
    else intensity = 'strong';

    const blurPrompt = `Apply a ${intensity} photographic blur (bokeh) to the selected area.`;
    onSubmit(blurPrompt);
    onClose();
  };

  return (
    <div
      ref={popoverRef}
      className="absolute z-30 bg-gray-800 border border-cyan-500 rounded-lg shadow-2xl p-4 w-80 transform -translate-x-1/2 -translate-y-full -mt-4 animate-fade-in-up"
      style={{ top: position.top, left: position.left }}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
        <CloseIcon className="w-5 h-5" />
      </button>
      <p className="text-sm font-semibold text-cyan-300 mb-2">Selective Edit</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'make this flower red'"
          className="w-full bg-gray-900 border border-gray-600 rounded-md py-1.5 px-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={!prompt.trim()}
          className="bg-cyan-600 text-white font-semibold px-4 rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-sm"
        >
          Go
        </button>
      </form>
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <label htmlFor="blur" className="block text-xs text-gray-400 mb-1">Blur Background</label>
        <input
            type="range" id="blur" min="0" max="100" value={blur}
            onChange={(e) => setBlur(parseInt(e.target.value))}
            onMouseUp={(e) => handleBlurChangeEnd((e.target as HTMLInputElement).value)}
            onTouchEnd={(e) => handleBlurChangeEnd((e.target as HTMLInputElement).value)}
            className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>
      <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 border-b border-r border-cyan-500 rotate-45"></div>
    </div>
  );
};

export default SelectiveEditPopover;
