export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: 'alkali' | 'alkaline-earth' | 'transition' | 'post-transition' | 'metalloid' | 'nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide';
}

export interface Phase {
  name: string;
  type: 'solid-solution' | 'intermetallic' | 'sigma' | 'laves' | 'carbide' | 'nitride' | 'oxide' | 'boride';
  structure: string;
  description: string;
  properties: string[];
  commonIn: string[];
  temperature?: string;
  composition?: string;
}

export interface AlloySystem {
  elements: string[];
  phases: Phase[];
  description: string;
}

export interface PredictionResult {
  primaryPhases: Phase[];
  secondaryPhases: Phase[];
  temperature: string;
  composition: string;
  microstructure: string;
  properties: string[];
  applications: string[];
}