
import React, { useState } from 'react';
import PresetFilters from './editing-tools/PresetFilters';
import AdjustmentSliders from './editing-tools/AdjustmentSliders';
import AITools from './editing-tools/AITools';
import MainActions from './editing-tools/MainActions';
import { WandIcon, SlidersIcon, SparklesIcon } from './icons/IconComponents';

interface EditingToolsProps {
  onEdit: (prompt: string) => void;
  onReset: () => void;
  onUndo: () => void;
  onNewImage: () => void;
  isLoading: boolean;
  hasEdits: boolean;
  editedImage: string | null;
}

type Tab = 'presets' | 'adjustments' | 'ai_tools';

const EditingTools: React.FC<EditingToolsProps> = (props) => {
  const [activeTab, setActiveTab] = useState<Tab>('presets');

  const tabs: { id: Tab; label: string; icon: React.FC<{className?: string}> }[] = [
    { id: 'presets', label: 'Presets', icon: WandIcon },
    { id: 'adjustments', label: 'Adjustments', icon: SlidersIcon },
    { id: 'ai_tools', label: 'AI Tools', icon: SparklesIcon },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="w-full h-full bg-gray-800/60 p-4 rounded-xl border border-gray-700 shadow-2xl flex flex-col">
        <div className="flex border-b border-gray-700 mb-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-cyan-400 text-cyan-300'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-grow">
          {activeTab === 'presets' && <PresetFilters onEdit={props.onEdit} isLoading={props.isLoading} />}
          {activeTab === 'adjustments' && <AdjustmentSliders onEdit={props.onEdit} isLoading={props.isLoading} />}
          {activeTab === 'ai_tools' && <AITools onEdit={props.onEdit} isLoading={props.isLoading} />}
        </div>
      </div>
      <MainActions {...props} />
    </div>
  );
};

export default EditingTools;
