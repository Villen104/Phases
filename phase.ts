export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: 'alkali' | 'alkaline-earth' | 'transition' | 'post-transition' | 'metalloid' | 'nonmetal' | 'noble-gas' | 'lanthanide' | 'actinide';
}

export interface PhasePoint {
  temperature: number;
  composition: number; // 0 to 1 (fraction of element B)
}

export interface PhaseBoundary {
  name: string;
  points: PhasePoint[];
}

export interface PhaseRegion {
  phase: string;
  boundaries: PhasePoint[];
  labelPosition: PhasePoint;
}

export interface BinarySystem {
  elementA: string;
  elementB: string;
  systemType: string;
  description: string;
  minTemp: number;
  maxTemp: number;
  phaseRegions: PhaseRegion[];
  phaseBoundaries: PhaseBoundary[];
}