import React from 'react';
import { PredictionResult } from '../types/alloy';
import { Atom, Zap, Settings, Wrench } from 'lucide-react';

interface PhaseResultsProps {
  result: PredictionResult | null;
}

const PhaseResults: React.FC<PhaseResultsProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <Atom className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Select elements and adjust parameters to predict phases</p>
        </div>
      </div>
    );
  }

  const getPhaseTypeColor = (type: string) => {
    const colors = {
      'solid-solution': 'bg-blue-100 text-blue-800 border-blue-200',
      'intermetallic': 'bg-purple-100 text-purple-800 border-purple-200',
      'sigma': 'bg-red-100 text-red-800 border-red-200',
      'laves': 'bg-orange-100 text-orange-800 border-orange-200',
      'carbide': 'bg-green-100 text-green-800 border-green-200',
      'nitride': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'oxide': 'bg-pink-100 text-pink-800 border-pink-200',
      'boride': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Primary Phases */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Atom className="w-5 h-5 mr-2" />
          Primary Phases
        </h2>
        <div className="space-y-4">
          {result.primaryPhases.map((phase, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{phase.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getPhaseTypeColor(phase.type)}`}>
                    {phase.type.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div className="font-medium">{phase.structure}</div>
                  {phase.temperature && <div>{phase.temperature}</div>}
                </div>
              </div>
              <p className="text-gray-600 mb-3">{phase.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Properties:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {phase.properties.map((prop, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                        {prop}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Common in:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {phase.commonIn.map((app, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Phases */}
      {result.secondaryPhases.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Secondary Phases
          </h2>
          <div className="space-y-3">
            {result.secondaryPhases.map((phase, index) => (
              <div key={index} className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{phase.name}</h3>
                    <p className="text-sm text-gray-600">{phase.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPhaseTypeColor(phase.type)}`}>
                    {phase.type.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Microstructure and Properties */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Microstructure
          </h2>
          <p className="text-gray-600 mb-4">{result.microstructure}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Temperature:</span>
              <span className="font-medium">{result.temperature}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Composition:</span>
              <span className="font-medium">{result.composition}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2" />
            Expected Properties
          </h2>
          <div className="space-y-2">
            {result.properties.map((property, index) => (
              <div key={index} className="flex items-center text-sm">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                <span className="text-gray-700">{property}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Potential Applications</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {result.applications.map((app, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{app}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhaseResults;