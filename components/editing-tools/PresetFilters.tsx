
import React from 'react';

interface PresetFiltersProps {
  onEdit: (prompt: string) => void;
  isLoading: boolean;
}

const PRESET_PROMPTS = [
  // Basic Enhancements
  { category: 'Enhancements', label: 'Auto Enhance', prompt: 'Perform an auto-enhancement on the image. Improve brightness, contrast, and color saturation for a balanced and vibrant look.' },
  { category: 'Enhancements', label: 'Face Tone', prompt: 'Enhance the facial features, smooth the skin slightly, and balance the skin tone for a natural, healthy look.' },
  { category: 'Enhancements', label: 'HDR', prompt: 'Apply a dramatic High Dynamic Range (HDR) effect, boosting details in both shadows and highlights.' },
  { category: 'Enhancements', label: 'Recolor', prompt: 'Subtly recolor the image, enhancing the separation between the foreground and background with complementary colors.' },
  
  // Artistic Styles
  { category: 'Artistic Styles', label: 'Cinematic', prompt: 'Apply a cinematic, teal and orange color grade to the image.' },
  { category: 'Artistic Styles', label: 'Vintage', prompt: 'Apply a warm, vintage film effect with slight grain and faded colors.' },
  { category: 'Artistic Styles', label: 'B & W', prompt: 'Convert the image to a high-contrast, dramatic black and white.' },
  { category: 'Artistic Styles', label: 'Golden Hour', prompt: 'Bathe the image in the warm, soft, golden light of a sunset.' },
  { category: 'Artistic Styles', label: 'Neon Punk', prompt: 'Give the image a futuristic, cyberpunk feel with neon pink and blue lighting.' },

  // Effects & Objects
  { category: 'Effects & Objects', label: 'Sunlight', prompt: 'Add warm, natural-looking sunlight rays into the scene.' },
  { category: 'Effects & Objects', label: 'Moonshine', prompt: 'Bathe the scene in cool, ethereal moonlight with soft glows.' },
  { category: 'Effects & Objects', label: 'Remove BG', prompt: 'Remove the background and replace it with a solid, neutral gray background.' },
  
  // Hairstyles
  { category: 'Hairstyles', label: 'Long Wavy', prompt: 'Add beautiful, long wavy hair to the person in the photo.' },
  { category: 'Hairstyles', label: 'Short Bob', prompt: 'Give the person in the photo a chic, short bob haircut.' },
  { category: 'Hairstyles', label: 'Pink Hair', prompt: 'Change the hair color of the person in the photo to a vibrant pink.' },
];

const groupedPrompts = PRESET_PROMPTS.reduce((acc, p) => {
    if (!acc[p.category]) {
        acc[p.category] = [];
    }
    acc[p.category].push(p);
    return acc;
}, {} as Record<string, typeof PRESET_PROMPTS>);


const PresetFilters: React.FC<PresetFiltersProps> = ({ onEdit, isLoading }) => {
  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {Object.entries(groupedPrompts).map(([category, prompts]) => (
        <div key={category}>
            <h3 className="text-md font-semibold text-gray-300 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
            {prompts.map(p => (
                <button
                key={p.label}
                onClick={() => onEdit(p.prompt)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-gray-700 text-gray-200 rounded-md hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                {p.label}
                </button>
            ))}
            </div>
        </div>
      ))}
    </div>
  );
};

export default PresetFilters;
