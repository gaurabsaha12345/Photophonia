
import React, { useState } from 'react';
import ImageDisplay from './ImageDisplay';
import SelectiveEditPopover from './SelectiveEditPopover';
import EditingTools from './EditingTools';

interface EditorPanelProps {
  originalImage: string;
  editedImage: string | null;
  isLoading: boolean;
  error: string | null;
  responseText: string | null;
  onEdit: (prompt: string) => void;
  onReset: () => void;
  onUndo: () => void;
  onNewImage: () => void;
  hasEdits: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  originalImage,
  editedImage,
  isLoading,
  error,
  responseText,
  onEdit,
  onReset,
  onUndo,
  onNewImage,
  hasEdits,
}) => {
  const [popover, setPopover] = useState<{ x: number; y: number; visible: boolean } | null>(null);

  const handleImageClick = (pos: { x: number; y: number }) => {
    setPopover({ x: pos.x, y: pos.y, visible: true });
  };

  const handleSelectiveSubmit = (prompt: string) => {
    const fullPrompt = `A user has indicated a specific point of interest in the image. Apply the following edit to that localized area: "${prompt}". Keep the changes focused on that region and blend them naturally with the surroundings.`;
    onEdit(fullPrompt);
    setPopover(null);
  };

  const closePopover = () => {
    setPopover(null);
  };
    
  return (
    <div className="flex flex-col flex-grow w-full h-full gap-8">
      <div className="relative">
        <ImageDisplay 
          originalImage={originalImage} 
          editedImage={editedImage} 
          isLoading={isLoading}
          onImageClick={handleImageClick}
          clickMarker={popover?.visible ? { x: popover.x, y: popover.y } : null}
        />
        {popover?.visible && (
          <SelectiveEditPopover
            position={{ top: popover.y, left: popover.x }}
            onSubmit={handleSelectiveSubmit}
            onClose={closePopover}
          />
        )}
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">
          <p>{error}</p>
        </div>
      )}
      {responseText && !error && (
        <div className="bg-blue-900/50 border border-blue-700 text-blue-200 px-4 py-3 rounded-lg">
          <p><span className="font-bold">AI Assistant:</span> {responseText}</p>
        </div>
      )}
      
      <EditingTools
        onEdit={onEdit}
        onReset={onReset}
        onNewImage={onNewImage}
        onUndo={onUndo}
        isLoading={isLoading}
        hasEdits={hasEdits}
        editedImage={editedImage}
      />
    </div>
  );
};

export default EditorPanel;
