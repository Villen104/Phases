import React from 'react';
import { elements } from '../data/elements';

interface ElementSelectorProps {
  selectedElements: [string, string];
  onElementChange: (index: 0 | 1, element: string) => void;
}

const ElementSelector: React.FC<ElementSelectorProps> = ({ selectedElements, onElementChange }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'transition': 'bg-blue-100 text-blue-800 border-blue-200',
      'post-transition': 'bg-green-100 text-green-800 border-green-200',
      'alkaline-earth': 'bg-purple-100 text-purple-800 border-purple-200',
      'metalloid': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'nonmetal': 'bg-red-100 text-red-800 border-red-200',
      'alkali': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Binary System</h2>
      
      {/* Element A Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Element A: {selectedElements[0]}
        </label>
        <select
          value={selectedElements[0]}
          onChange={(e) => onElementChange(0, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {elements.map((element) => (
            <option key={element.symbol} value={element.symbol}>
              {element.symbol} - {element.name}
            </option>
          ))}
        </select>
      </div>

      {/* Element B Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Element B: {selectedElements[1]}
        </label>
        <select
          value={selectedElements[1]}
          onChange={(e) => onElementChange(1, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {elements.map((element) => (
            <option key={element.symbol} value={element.symbol}>
              {element.symbol} - {element.name}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Elements Display */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-700 mb-3">Current System:</h3>
        <div className="flex items-center justify-between">
          {selectedElements.map((element, index) => {
            const elementData = elements.find(e => e.symbol === element);
            return (
              <div key={element} className="text-center">
                <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center ${getCategoryColor(elementData?.category || 'transition')}`}>
                  <div className="text-lg font-bold">{element}</div>
                  <div className="text-xs">{elementData?.atomicNumber}</div>
                </div>
                <div className="text-xs text-gray-600 mt-1">{elementData?.name}</div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-3 text-sm text-gray-600">
          Binary System: {selectedElements[0]}-{selectedElements[1]}
        </div>
      </div>
    </div>
  );
};

export default ElementSelector;