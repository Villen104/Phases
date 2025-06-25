import React from 'react';
import { BinarySystem } from '../types/phase';
import { Atom, Thermometer, BarChart3, Wrench } from 'lucide-react';

interface PhaseInfoProps {
  system: BinarySystem | null;
  currentPhase: string;
  temperature: number;
  composition: number;
  elementA: string;
  elementB: string;
}

const PhaseInfo: React.FC<PhaseInfoProps> = ({ 
  system, 
  currentPhase, 
  temperature, 
  composition, 
  elementA, 
  elementB 
}) => {
  const getPhaseDetails = (phaseName: string) => {
    const phaseData: { [key: string]: any } = {
      'Liquid': {
        description: 'Molten state where atoms are randomly arranged with high mobility.',
        properties: ['High atomic mobility', 'Random atomic arrangement', 'High temperature stability'],
        structure: 'Disordered liquid',
        applications: ['Casting processes', 'Welding', 'Heat treatment']
      },
      'Austenite': {
        description: 'Face-centered cubic phase of iron, stable at high temperatures.',
        properties: ['Non-magnetic', 'High ductility', 'Good formability', 'Corrosion resistant'],
        structure: 'Face-Centered Cubic (FCC)',
        applications: ['Stainless steels', 'High-temperature alloys', 'Austenitic steels']
      },
      'Ferrite': {
        description: 'Body-centered cubic phase of iron, stable at low temperatures.',
        properties: ['Magnetic', 'Soft and ductile', 'Low carbon solubility', 'Good formability'],
        structure: 'Body-Centered Cubic (BCC)',
        applications: ['Low-carbon steels', 'Electrical applications', 'Automotive parts']
      },
      'Cementite': {
        description: 'Iron carbide (Fe₃C) - hard and brittle intermetallic compound.',
        properties: ['Very hard', 'Brittle', 'High wear resistance', 'Magnetic below 210°C'],
        structure: 'Orthorhombic',
        applications: ['Tool steels', 'Wear-resistant components', 'Cutting tools']
      },
      'Pearlite': {
        description: 'Lamellar structure of alternating ferrite and cementite layers.',
        properties: ['Good strength-ductility balance', 'Moderate hardness', 'Good machinability'],
        structure: 'Lamellar (Ferrite + Cementite)',
        applications: ['Medium carbon steels', 'Rail steels', 'Wire applications']
      },
      'Martensite': {
        description: 'Supersaturated solid solution formed by rapid cooling.',
        properties: ['Very high hardness', 'High strength', 'Brittle', 'Magnetic'],
        structure: 'Body-Centered Tetragonal (BCT)',
        applications: ['Tool steels', 'Hardened components', 'Cutting tools']
      },
      'Alpha': {
        description: 'Low-temperature stable phase, typically hexagonal close-packed.',
        properties: ['High strength', 'Good corrosion resistance', 'Lower ductility'],
        structure: 'Hexagonal Close-Packed (HCP)',
        applications: ['Structural components', 'Corrosive environments']
      },
      'Beta': {
        description: 'High-temperature phase, typically body-centered cubic.',
        properties: ['Good formability', 'High-temperature stability', 'Good weldability'],
        structure: 'Body-Centered Cubic (BCC)',
        applications: ['High-temperature applications', 'Aerospace components']
      },
      'Sigma': {
        description: 'Brittle intermetallic phase that reduces toughness.',
        properties: ['Extremely brittle', 'High hardness', 'Reduces toughness', 'Non-magnetic'],
        structure: 'Tetragonal',
        applications: ['Avoided in most applications', 'Research interest']
      },
      'Laves': {
        description: 'Topologically close-packed phase with AB₂ stoichiometry.',
        properties: ['High melting point', 'Brittle', 'High hardness', 'Ordered structure'],
        structure: 'Hexagonal (C14, C15, C36)',
        applications: ['High-temperature alloys', 'Structural applications']
      },
      'Intermetallic': {
        description: 'Ordered compound with specific stoichiometry between elements.',
        properties: ['Ordered structure', 'Often brittle', 'High melting point', 'Specific composition'],
        structure: 'Various ordered structures',
        applications: ['High-temperature alloys', 'Specialized applications']
      },
      'Solid Solution': {
        description: 'Homogeneous mixture where one element dissolves in another.',
        properties: ['Homogeneous structure', 'Variable composition', 'Intermediate properties'],
        structure: 'Based on solvent structure',
        applications: ['Alloy strengthening', 'Property modification']
      }
    };

    // Find matching phase data
    for (const [key, data] of Object.entries(phaseData)) {
      if (phaseName.toLowerCase().includes(key.toLowerCase())) {
        return data;
      }
    }

    return {
      description: 'Phase information not available for this combination.',
      properties: ['Properties depend on specific composition and temperature'],
      structure: 'Structure varies with composition',
      applications: ['Applications depend on specific properties']
    };
  };

  const phaseDetails = getPhaseDetails(currentPhase);

  if (!system) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <Atom className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Select elements to view phase information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Phase */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Atom className="w-5 h-5 mr-2" />
          Current Phase
        </h2>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium text-blue-900 mb-2">{currentPhase || 'Unknown Phase'}</h3>
          <p className="text-sm text-blue-800">{phaseDetails.description}</p>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Crystal Structure
            </h4>
            <p className="text-sm text-gray-600 bg-gray-50 rounded p-2">{phaseDetails.structure}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Properties:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {phaseDetails.properties.map((prop: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  {prop}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Thermometer className="w-5 h-5 mr-2" />
          System Information
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">System:</span>
            <span className="font-medium">{elementA}-{elementB}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Temperature Range:</span>
            <span className="font-medium">{system.minTemp}°C - {system.maxTemp}°C</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">System Type:</span>
            <span className="font-medium">{system.systemType}</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">{system.description}</p>
        </div>
      </div>

      {/* Applications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Wrench className="w-5 h-5 mr-2" />
          Applications
        </h2>
        
        <div className="space-y-2">
          {phaseDetails.applications.map((app: string, index: number) => (
            <div key={index} className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-700">{app}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Stability */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Phase Stability</h2>
        
        <div className="space-y-3">
          <div className="bg-green-50 rounded-lg p-3">
            <h4 className="font-medium text-green-800 mb-1">Stable Conditions</h4>
            <p className="text-sm text-green-700">
              Current phase is stable at {temperature}°C with {(composition * 100).toFixed(1)}% {elementB}
            </p>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>• Phase stability depends on temperature and composition</p>
            <p>• Cooling rate affects final microstructure</p>
            <p>• Processing conditions influence phase formation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseInfo;