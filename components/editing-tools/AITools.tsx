
import React from 'react';

interface AIToolsProps {
  onEdit: (prompt: string) => void;
  isLoading: boolean;
}

const AI_TOOLS = [
    { 
        label: 'AI Skin Retouch', 
        prompt: 'Perform a professional-grade skin retouch. Smooth skin, remove blemishes, and even out skin tone for a natural, high-quality finish, paying close attention to preserving skin texture.',
        description: 'Automatically smooths skin and removes blemishes for a flawless portrait.'
    },
    { 
        label: 'AI Upscaler', 
        prompt: 'Upscale this image to a higher resolution. Enhance details, sharpen lines, and improve overall clarity without introducing artifacts.',
        description: 'Increases image resolution and enhances fine details for a clearer picture.'
    },
    { 
        label: 'Face Cutout', 
        prompt: 'Detect the primary face in the image, carefully cut it out from the background, and provide a transparent background.',
        description: 'Detects and isolates the main face from its background.'
    },
];

const AITools: React.FC<AIToolsProps> = ({ onEdit, isLoading }) => {
  return (
    <div className="space-y-3">
        {AI_TOOLS.map(tool => (
            <button
                key={tool.label}
                onClick={() => onEdit(tool.prompt)}
                disabled={isLoading}
                className="w-full text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-cyan-500"
            >
                <p className="font-semibold text-gray-200">{tool.label}</p>
                <p className="text-sm text-gray-400">{tool.description}</p>
            </button>
        ))}
    </div>
  );
};

export default AITools;
