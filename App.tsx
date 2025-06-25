import React, { useState, useEffect } from 'react';
import { Atom, Thermometer, BarChart3, Info, Crosshair } from 'lucide-react';
import ElementSelector from './components/ElementSelector';
import PhaseDiagram from './components/PhaseDiagram';
import PhaseInfo from './components/PhaseInfo';
import ControlPanel from './components/ControlPanel';
import { BinarySystem } from './types/phase';
import { binarySystems } from './data/binarySystems';
import { getPhaseAtPoint } from './utils/phaseCalculator';

function App() {
  const [selectedElements, setSelectedElements] = useState<[string, string]>(['Fe', 'C']);
  const [temperature, setTemperature] = useState<number>(800);
  const [composition, setComposition] = useState<number>(0.5);
  const [currentSystem, setCurrentSystem] = useState<BinarySystem | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [crosshairPosition, setCrosshairPosition] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const systemKey = `${selectedElements[0]}-${selectedElements[1]}`;
    const reverseKey = `${selectedElements[1]}-${selectedElements[0]}`;
    
    const system = binarySystems[systemKey] || binarySystems[reverseKey];
    setCurrentSystem(system || null);
    
    if (system) {
      const phase = getPhaseAtPoint(system, temperature, composition);
      setCurrentPhase(phase);
    }
  }, [selectedElements, temperature, composition]);

  const handleElementChange = (index: 0 | 1, element: string) => {
    const newElements: [string, string] = [...selectedElements];
    newElements[index] = element;
    setSelectedElements(newElements);
  };

  const handleDiagramClick = (temp: number, comp: number) => {
    setTemperature(temp);
    setComposition(comp);
    setCrosshairPosition({ x: comp, y: temp });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Binary Phase Diagram Explorer</h1>
                <p className="text-sm text-gray-600">Interactive phase diagrams for two-element systems</p>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Info className="w-4 h-4" />
              <span className="text-sm font-medium">Guide</span>
            </button>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-start space-x-3">
              <Atom className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <h3 className="font-semibold mb-2">How to Use:</h3>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Select two elements to create a binary phase diagram</li>
                  <li>Use temperature and composition sliders to explore different conditions</li>
                  <li>Click anywhere on the diagram to set specific temperature/composition points</li>
                  <li>View phase information and properties in the right panel</li>
                  <li>Observe how phases change with temperature and composition variations</li>
                </ul>
                <p className="mt-2 text-xs">
                  <strong>Note:</strong> Diagrams are simplified representations based on common binary systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Element Selection */}
          <div className="lg:col-span-1 space-y-6">
            <ElementSelector 
              selectedElements={selectedElements}
              onElementChange={handleElementChange}
            />
            
            <ControlPanel
              temperature={temperature}
              composition={composition}
              onTemperatureChange={setTemperature}
              onCompositionChange={setComposition}
              elementA={selectedElements[0]}
              elementB={selectedElements[1]}
            />

            {/* Current Point Info */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Crosshair className="w-4 h-4 mr-2" />
                Current Point
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Temperature:</span>
                  <span className="font-medium">{temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Composition:</span>
                  <span className="font-medium">{(composition * 100).toFixed(1)}% {selectedElements[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phase:</span>
                  <span className="font-medium text-blue-600">{currentPhase || 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Phase Diagram */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {selectedElements[0]}-{selectedElements[1]} Phase Diagram
              </h2>
              <PhaseDiagram
                system={currentSystem}
                currentTemp={temperature}
                currentComp={composition}
                onPointClick={handleDiagramClick}
                crosshairPosition={crosshairPosition}
              />
            </div>
          </div>

          {/* Right Panel - Phase Information */}
          <div className="lg:col-span-1">
            <PhaseInfo
              system={currentSystem}
              currentPhase={currentPhase}
              temperature={temperature}
              composition={composition}
              elementA={selectedElements[0]}
              elementB={selectedElements[1]}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>Binary Phase Diagram Explorer - Educational Tool for Materials Science</p>
            <p className="mt-1">Interactive exploration of two-element phase relationships</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;