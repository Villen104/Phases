import { Phase } from '../types/alloy';

export const phases: Phase[] = [
  {
    name: 'Austenite (γ-Fe)',
    type: 'solid-solution',
    structure: 'Face-Centered Cubic (FCC)',
    description: 'High-temperature phase of iron and iron-carbon alloys with excellent ductility and formability.',
    properties: ['High ductility', 'Non-magnetic', 'Good corrosion resistance', 'High strength at elevated temperatures'],
    commonIn: ['Stainless steels', 'High-temperature alloys', 'Austenitic steels'],
    temperature: '912-1394°C',
    composition: 'Fe-C, Fe-Ni-Cr'
  },
  {
    name: 'Ferrite (α-Fe)',
    type: 'solid-solution',
    structure: 'Body-Centered Cubic (BCC)',
    description: 'Low-temperature phase of iron with magnetic properties and limited carbon solubility.',
    properties: ['Magnetic', 'Soft and ductile', 'Low carbon solubility', 'Good formability'],
    commonIn: ['Low-carbon steels', 'Ferritic stainless steels', 'Pure iron'],
    temperature: 'Below 912°C',
    composition: 'Fe with <0.02% C'
  },
  {
    name: 'Martensite',
    type: 'solid-solution',
    structure: 'Body-Centered Tetragonal (BCT)',
    description: 'Supersaturated solid solution formed by rapid cooling, characterized by high hardness.',
    properties: ['Very high hardness', 'High strength', 'Brittle', 'Magnetic'],
    commonIn: ['Tool steels', 'Hardened carbon steels', 'Martensitic stainless steels'],
    temperature: 'Formed by quenching',
    composition: 'Fe-C supersaturated'
  },
  {
    name: 'Sigma Phase (σ)',
    type: 'sigma',
    structure: 'Tetragonal',
    description: 'Brittle intermetallic phase that forms in high-chromium alloys, reducing toughness.',
    properties: ['Extremely brittle', 'High hardness', 'Reduces toughness', 'Non-magnetic'],
    commonIn: ['Duplex stainless steels', 'Super-duplex steels', 'High-Cr ferritic steels'],
    temperature: '600-1000°C',
    composition: 'Fe-Cr (typically 45-50% Cr)'
  },
  {
    name: 'Laves Phase',
    type: 'laves',
    structure: 'Hexagonal (C14, C15, C36)',
    description: 'Topologically close-packed phase with AB₂ stoichiometry, often brittle.',
    properties: ['High melting point', 'Brittle', 'High hardness', 'Ordered structure'],
    commonIn: ['Ni-based superalloys', 'Ti-based alloys', 'Mg-based alloys'],
    temperature: 'High temperature stable',
    composition: 'AB₂ (e.g., MgZn₂, TiCr₂)'
  },
  {
    name: 'Gamma Prime (γ\')',
    type: 'intermetallic',
    structure: 'L1₂ (Ordered FCC)',
    description: 'Ordered intermetallic phase that provides precipitation strengthening in superalloys.',
    properties: ['High-temperature strength', 'Ordered structure', 'Coherent with matrix', 'Stable at high temperatures'],
    commonIn: ['Ni-based superalloys', 'Turbine blade alloys', 'High-temperature applications'],
    temperature: 'Stable up to 1200°C',
    composition: 'Ni₃(Al,Ti)'
  },
  {
    name: 'Beta Phase (β)',
    type: 'solid-solution',
    structure: 'Body-Centered Cubic (BCC)',
    description: 'High-temperature phase in titanium alloys with good formability.',
    properties: ['Good formability', 'Lower density', 'High-temperature stability', 'Good weldability'],
    commonIn: ['Ti-based alloys', 'Beta titanium alloys', 'Aerospace applications'],
    temperature: 'Above 882°C for Ti',
    composition: 'Ti with β-stabilizers (V, Mo, Nb)'
  },
  {
    name: 'Alpha Phase (α)',
    type: 'solid-solution',
    structure: 'Hexagonal Close-Packed (HCP)',
    description: 'Low-temperature phase in titanium alloys with high strength and corrosion resistance.',
    properties: ['High strength', 'Excellent corrosion resistance', 'Lower ductility', 'Stable at room temperature'],
    commonIn: ['Ti-based alloys', 'Alpha titanium alloys', 'Corrosive environments'],
    temperature: 'Below 882°C for Ti',
    composition: 'Ti with α-stabilizers (Al, O, N)'
  },
  {
    name: 'Cementite (Fe₃C)',
    type: 'carbide',
    structure: 'Orthorhombic',
    description: 'Iron carbide phase that provides hardness in carbon steels.',
    properties: ['Very hard', 'Brittle', 'Magnetic below 210°C', 'High wear resistance'],
    commonIn: ['Carbon steels', 'Cast irons', 'Tool steels'],
    temperature: 'Stable below 727°C',
    composition: 'Fe₃C (6.67% C)'
  },
  {
    name: 'Pearlite',
    type: 'solid-solution',
    structure: 'Lamellar (Ferrite + Cementite)',
    description: 'Eutectoid structure consisting of alternating layers of ferrite and cementite.',
    properties: ['Good strength-ductility balance', 'Lamellar structure', 'Moderate hardness', 'Good machinability'],
    commonIn: ['Medium carbon steels', 'Rail steels', 'Wire applications'],
    temperature: 'Forms at 727°C',
    composition: '0.77% C in Fe-C system'
  },
  {
    name: 'Bainite',
    type: 'solid-solution',
    structure: 'Acicular (Needle-like)',
    description: 'Intermediate transformation product with good toughness and strength.',
    properties: ['Good toughness', 'High strength', 'Acicular morphology', 'Better than pearlite'],
    commonIn: ['HSLA steels', 'Pipeline steels', 'Automotive steels'],
    temperature: '250-550°C transformation',
    composition: 'Fe-C with controlled cooling'
  },
  {
    name: 'Widmanstätten Ferrite',
    type: 'solid-solution',
    structure: 'Plate-like BCC',
    description: 'Plate-like ferrite that forms along austenite grain boundaries.',
    properties: ['Plate morphology', 'Reduced toughness', 'Directional properties', 'Coarse structure'],
    commonIn: ['Slowly cooled steels', 'Thick sections', 'Weld heat-affected zones'],
    temperature: 'Slow cooling from austenite',
    composition: 'Low-carbon steels'
  }
];