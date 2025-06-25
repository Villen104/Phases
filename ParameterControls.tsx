import React from 'react';
import { Thermometer, Beaker } from 'lucide-react';

interface ParameterControlsProps {
  temperature: number;
  composition: string;
  onTemperatureChange: (temp: number) => void;
  onCompositionChange: (comp: string) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  temperature,
  composition,
  onTemperatureChange,
  onCompositionChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Processing Parameters</h2>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Thermometer className="w-4 h-4 mr-2" />
            Temperature: {temperature}°C
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0°C</span>
            <span>Room Temp</span>
            <span>1000°C</span>
            <span>2000°C</span>
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Beaker className="w-4 h-4 mr-2" />
            Composition Notes
          </label>
          <textarea
            value={composition}
            onChange={(e) => onCompositionChange(e.target.value)}
            placeholder="Enter specific composition details (e.g., 18% Cr, 8% Ni, balance Fe)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Temperature Guidelines</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <div>• Room temperature (25°C): Stable phases</div>
            <div>• 500-800°C: Intermediate temperature phases</div>
            <div>• 800-1200°C: High-temperature transformations</div>
            <div>• >1200°C: Liquid phase regions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;