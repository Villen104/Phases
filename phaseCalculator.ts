import { BinarySystem } from '../types/phase';

export function getPhaseAtPoint(system: BinarySystem, temperature: number, composition: number): string {
  // Check each phase region to see if the point falls within it
  for (const region of system.phaseRegions) {
    if (isPointInRegion(temperature, composition, region.boundaries)) {
      return region.phase;
    }
  }
  
  return 'Unknown Phase';
}

function isPointInRegion(temperature: number, composition: number, boundaries: Array<{temperature: number, composition: number}>): boolean {
  // Use ray casting algorithm to determine if point is inside polygon
  let inside = false;
  const x = composition;
  const y = temperature;
  
  for (let i = 0, j = boundaries.length - 1; i < boundaries.length; j = i++) {
    const xi = boundaries[i].composition;
    const yi = boundaries[i].temperature;
    const xj = boundaries[j].composition;
    const yj = boundaries[j].temperature;
    
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
}

export function interpolatePhaseProperties(phase: string, temperature: number, composition: number) {
  // This function could be expanded to provide temperature and composition-dependent properties
  const baseProperties: { [key: string]: any } = {
    'Liquid': {
      density: 7.0 - (temperature - 1500) * 0.001,
      viscosity: Math.exp(-temperature / 500)
    },
    'Austenite': {
      hardness: 200 + composition * 100,
      strength: 400 + composition * 200
    },
    'Ferrite': {
      hardness: 80 + composition * 50,
      strength: 250 + composition * 100
    },
    'Martensite': {
      hardness: 600 + composition * 200,
      strength: 1500 + composition * 500
    }
  };
  
  return baseProperties[phase] || {};
}