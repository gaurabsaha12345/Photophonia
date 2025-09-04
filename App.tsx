
import React, { useState, useCallback } from 'react';
import { type ImageData } from './types';
import { editImage } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import EditorPanel from './components/EditorPanel';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [editHistory, setEditHistory] = useState<string[]>([]);
  const [responseText, setResponseText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editedImage = editHistory.length > 0 ? editHistory[editHistory.length - 1] : null;

  const handleImageUpload = async (file: File) => {
    setError(null);
    setEditHistory([]);
    setResponseText(null);
    try {
      const base64 = await fileToBase64(file);
      setOriginalImage({ file, base64 });
    } catch (err) {
      setError('Failed to read the image file. Please try another one.');
      setOriginalImage(null);
    }
  };

  const handleEdit = useCallback(async (prompt: string) => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponseText(null);

    const imageToEdit = editedImage || originalImage.base64;

    try {
      const result = await editImage(imageToEdit, originalImage.file.type, prompt);
      
      if (result.image) {
        setEditHistory(prev => [...prev, result.image]);
      } else {
        setError('The AI did not return an image. It might not be able to fulfill this request. Please try a different prompt.');
      }
      
      if(result.text) {
        setResponseText(result.text);
      }

    } catch (err) {
      console.error(err);
      setError('An error occurred while editing the image. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, editedImage]);
  
  const handleReset = () => {
    setEditHistory([]);
    setResponseText(null);
    setError(null);
  };

  const handleUndo = () => {
    setEditHistory(prev => prev.slice(0, -1));
  };

  const handleNewImage = () => {
    setOriginalImage(null);
    setEditHistory([]);
    setResponseText(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <EditorPanel
            originalImage={originalImage.base64}
            editedImage={editedImage}
            isLoading={isLoading}
            error={error}
            responseText={responseText}
            onEdit={handleEdit}
            onReset={handleReset}
            onUndo={handleUndo}
            onNewImage={handleNewImage}
            hasEdits={editHistory.length > 0}
          />
        )}
      </main>
    </div>
  );
};

export default App;
