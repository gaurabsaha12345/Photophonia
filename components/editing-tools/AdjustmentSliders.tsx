
import React, { useState } from 'react';

interface AdjustmentSlidersProps {
  onEdit: (prompt: string) => void;
  isLoading: boolean;
}

const AdjustmentSliders: React.FC<AdjustmentSlidersProps> = ({ onEdit, isLoading }) => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [sharpness, setSharpness] = useState(0);

  const handleSliderChangeEnd = (type: 'brightness' | 'contrast' | 'sharpness', valueStr: string) => {
    const value = parseInt(valueStr, 10);
    
    let prompt = '';
    const level = Math.abs(value);
    let intensity = '';
    
    // Determine intensity for prompt
    if (type === 'sharpness') {
      if (level <= 33) intensity = 'slightly';
      else if (level <= 66) intensity = 'moderately';
      else intensity = 'significantly';
    } else {
      if (level <= 16) intensity = 'slightly';
      else if (level <= 33) intensity = 'moderately';
      else intensity = 'significantly';
    }

    if (type === 'sharpness') {
        if (value === 0) return; // Don't send prompt if slider is at default
        prompt = `Make the image ${intensity} sharper.`
    } else { // brightness/contrast
        if (value === 0) {
          prompt = `Reset the ${type} to a neutral level.`
        } else if (value > 0) {
            prompt = `${intensity.charAt(0).toUpperCase() + intensity.slice(1)} increase the ${type}.`;
        } else {
            prompt = `${intensity.charAt(0).toUpperCase() + intensity.slice(1)} decrease the ${type}.`;
        }
    }

    if(prompt) {
      onEdit(prompt);
    }
  };
  
  const handleReset = () => {
    if (brightness !== 0 || contrast !== 0 || sharpness !== 0) {
      onEdit("Reset brightness, contrast, and sharpness to their default, neutral values.");
    }
    setBrightness(0);
    setContrast(0);
    setSharpness(0);
  }

  return (
    <div className="w-full space-y-4">
        <div className="flex justify-between items-center">
             <h3 className="text-md font-semibold text-gray-300">Manual Adjustments</h3>
             <button onClick={handleReset} disabled={isLoading} className="text-xs text-cyan-400 hover:text-cyan-300 disabled:opacity-50">Reset All</button>
        </div>
        <div className="space-y-3">
            {/* Brightness */}
            <div className="grid grid-cols-4 items-center gap-2">
                <label htmlFor="brightness" className="text-sm text-gray-400 col-span-1">Brightness</label>
                <input type="range" id="brightness" min="-50" max="50" value={brightness} disabled={isLoading}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    onMouseUp={(e) => handleSliderChangeEnd('brightness', (e.target as HTMLInputElement).value)}
                    onTouchEnd={(e) => handleSliderChangeEnd('brightness', (e.target as HTMLInputElement).value)}
                    className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer col-span-2 accent-cyan-500"
                />
                <span className="text-sm text-center text-gray-300 col-span-1">{brightness}</span>
            </div>
            {/* Contrast */}
            <div className="grid grid-cols-4 items-center gap-2">
                <label htmlFor="contrast" className="text-sm text-gray-400 col-span-1">Contrast</label>
                <input type="range" id="contrast" min="-50" max="50" value={contrast} disabled={isLoading}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    onMouseUp={(e) => handleSliderChangeEnd('contrast', (e.target as HTMLInputElement).value)}
                    onTouchEnd={(e) => handleSliderChangeEnd('contrast', (e.target as HTMLInputElement).value)}
                    className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer col-span-2 accent-cyan-500"
                />
                <span className="text-sm text-center text-gray-300 col-span-1">{contrast}</span>
            </div>
            {/* Sharpness */}
            <div className="grid grid-cols-4 items-center gap-2">
                <label htmlFor="sharpness" className="text-sm text-gray-400 col-span-1">Sharpness</label>
                <input type="range" id="sharpness" min="0" max="100" value={sharpness} disabled={isLoading}
                    onChange={(e) => setSharpness(parseInt(e.target.value))}
                    onMouseUp={(e) => handleSliderChangeEnd('sharpness', (e.target as HTMLInputElement).value)}
                    onTouchEnd={(e) => handleSliderChangeEnd('sharpness', (e.target as HTMLInputElement).value)}
                    className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer col-span-2 accent-cyan-500"
                />
                <span className="text-sm text-center text-gray-300 col-span-1">{sharpness}</span>
            </div>
        </div>
    </div>
  );
};

export default AdjustmentSliders;
