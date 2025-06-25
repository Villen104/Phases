import { AlloySystem } from '../types/alloy';
import { phases } from './phases';

export const alloySystems: AlloySystem[] = [
  {
    elements: ['Fe', 'C'],
    phases: phases.filter(p => ['Austenite (γ-Fe)', 'Ferrite (α-Fe)', 'Martensite', 'Cementite (Fe₃C)', 'Pearlite', 'Bainite'].includes(p.name)),
    description: 'Iron-Carbon system forms the basis of all carbon and alloy steels'
  },
  {
    elements: ['Fe', 'Cr', 'Ni'],
    phases: phases.filter(p => ['Austenite (γ-Fe)', 'Ferrite (α-Fe)', 'Sigma Phase (σ)'].includes(p.name)),
    description: 'Stainless steel system with excellent corrosion resistance'
  },
  {
    elements: ['Ni', 'Al', 'Ti'],
    phases: phases.filter(p => ['Gamma Prime (γ\')', 'Austenite (γ-Fe)'].includes(p.name)),
    description: 'Superalloy system for high-temperature applications'
  },
  {
    elements: ['Ti', 'Al'],
    phases: phases.filter(p => ['Alpha Phase (α)', 'Beta Phase (β)'].includes(p.name)),
    description: 'Titanium-aluminum system for aerospace applications'
  },
  {
    elements: ['Ti', 'V'],
    phases: phases.filter(p => ['Alpha Phase (α)', 'Beta Phase (β)'].includes(p.name)),
    description: 'Beta titanium alloy system with good formability'
  },
  {
    elements: ['Mg', 'Zn'],
    phases: phases.filter(p => ['Laves Phase'].includes(p.name)),
    description: 'Magnesium-zinc system forming Laves phases'
  }
];