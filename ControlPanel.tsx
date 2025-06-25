import React from 'react';
import { Thermometer, BarChart3, Sliders } from 'lucide-react';

interface ControlPanelProps {
  temperature: number;
  composition: number;
  onTemperatureChange: (temp: number) => void;
  onCompositionChange: (comp: number) => void;
  elementA: string;
  elementB: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  temperature,
  composition,
  onTemperatureChange,
  onCompositionChange,
  elementA,
  elementB
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Sliders className="w-5 h-5 mr-2" />
        Controls
      </h2>
      
      <div className="space-y-6">
        {/* Temperature Control */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Thermometer className="w-4 h-4 mr-2" />
            Temperature: {temperature}°C
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0°C</span>
            <span>500°C</span>
            <span>1000°C</span>
            <span>1500°C</span>
            <span>2000°C</span>
          </div>
        </div>

        {/* Composition Control */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <BarChart3 className="w-4 h-4 mr-2" />
            Composition: {(composition * 100).toFixed(1)}% {elementB}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={composition}
            onChange={(e) => onCompositionChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0% {elementB}</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100% {elementB}</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Presets:</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onTemperatureChange(25);
                onCompositionChange(0.1);
              }}
              className="px-3 py-2 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Room Temp
            </button>
            <button
              onClick={() => {
                onTemperatureChange(800);
                onCompositionChange(0.5);
              }}
              className="px-3 py-2 text-xs bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors"
            >
              High Temp
            </button>
            <button
              onClick={() => {
                onTemperatureChange(1200);
                onCompositionChange(0.2);
              }}
              className="px-3 py-2 text-xs bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              Melting
            </button>
            <button
              onClick={() => {
                onTemperatureChange(600);
                onCompositionChange(0.77);
              }}
              className="px-3 py-2 text-xs bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              Eutectoid
            </button>
          </div>
        </div>

        {/* Manual Input */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Manual Input:</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Temperature (°C)</label>
              <input
                type="number"
                min="0"
                max="2000"
                value={temperature}
                onChange={(e) => onTemperatureChange(Number(e.target.value))}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">% {elementB}</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={(composition * 100).toFixed(1)}
                onChange={(e) => onCompositionChange(Number(e.target.value) / 100)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;