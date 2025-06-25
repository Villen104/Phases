import { BinarySystem } from '../types/phase';

export const binarySystems: { [key: string]: BinarySystem } = {
  'Fe-C': {
    elementA: 'Fe',
    elementB: 'C',
    systemType: 'Eutectic-Eutectoid',
    description: 'Iron-Carbon system forms the basis of all carbon and alloy steels. Shows eutectic and eutectoid transformations.',
    minTemp: 0,
    maxTemp: 1600,
    phaseRegions: [
      {
        phase: 'Liquid',
        boundaries: [
          { temperature: 1538, composition: 0 },
          { temperature: 1495, composition: 0.043 },
          { temperature: 1147, composition: 0.043 },
          { temperature: 1147, composition: 0.067 },
          { temperature: 1600, composition: 0.067 },
          { temperature: 1600, composition: 0 }
        ],
        labelPosition: { temperature: 1400, composition: 0.03 }
      },
      {
        phase: 'Austenite',
        boundaries: [
          { temperature: 1495, composition: 0.043 },
          { temperature: 1147, composition: 0.043 },
          { temperature: 1147, composition: 0.067 },
          { temperature: 727, composition: 0.0077 },
          { temperature: 912, composition: 0 },
          { temperature: 1495, composition: 0 }
        ],
        labelPosition: { temperature: 1000, composition: 0.025 }
      },
      {
        phase: 'Ferrite',
        boundaries: [
          { temperature: 912, composition: 0 },
          { temperature: 727, composition: 0.0077 },
          { temperature: 0, composition: 0.0077 },
          { temperature: 0, composition: 0 }
        ],
        labelPosition: { temperature: 400, composition: 0.003 }
      },
      {
        phase: 'Cementite',
        boundaries: [
          { temperature: 1147, composition: 0.067 },
          { temperature: 1600, composition: 0.067 },
          { temperature: 1600, composition: 0.1 },
          { temperature: 0, composition: 0.1 },
          { temperature: 0, composition: 0.067 },
          { temperature: 727, composition: 0.067 }
        ],
        labelPosition: { temperature: 400, composition: 0.08 }
      },
      {
        phase: 'Pearlite',
        boundaries: [
          { temperature: 727, composition: 0.0077 },
          { temperature: 727, composition: 0.067 },
          { temperature: 0, composition: 0.067 },
          { temperature: 0, composition: 0.0077 }
        ],
        labelPosition: { temperature: 350, composition: 0.037 }
      }
    ],
    phaseBoundaries: [
      {
        name: 'Liquidus',
        points: [
          { temperature: 1538, composition: 0 },
          { temperature: 1495, composition: 0.043 },
          { temperature: 1147, composition: 0.043 }
        ]
      },
      {
        name: 'Solidus',
        points: [
          { temperature: 1495, composition: 0 },
          { temperature: 1147, composition: 0.043 }
        ]
      },
      {
        name: 'A3 Line',
        points: [
          { temperature: 912, composition: 0 },
          { temperature: 727, composition: 0.0077 }
        ]
      },
      {
        name: 'Eutectoid Line',
        points: [
          { temperature: 727, composition: 0 },
          { temperature: 727, composition: 0.1 }
        ]
      }
    ]
  },
  'Ti-Al': {
    elementA: 'Ti',
    elementB: 'Al',
    systemType: 'Peritectic',
    description: 'Titanium-Aluminum system important for aerospace applications. Forms various intermetallic phases.',
    minTemp: 0,
    maxTemp: 1800,
    phaseRegions: [
      {
        phase: 'Liquid',
        boundaries: [
          { temperature: 1668, composition: 0 },
          { temperature: 1665, composition: 0.1 },
          { temperature: 1460, composition: 0.5 },
          { temperature: 1800, composition: 0.5 },
          { temperature: 1800, composition: 0 }
        ],
        labelPosition: { temperature: 1700, composition: 0.25 }
      },
      {
        phase: 'Beta',
        boundaries: [
          { temperature: 1668, composition: 0 },
          { temperature: 1665, composition: 0.1 },
          { temperature: 882, composition: 0.1 },
          { temperature: 882, composition: 0 }
        ],
        labelPosition: { temperature: 1200, composition: 0.05 }
      },
      {
        phase: 'Alpha',
        boundaries: [
          { temperature: 882, composition: 0 },
          { temperature: 882, composition: 0.1 },
          { temperature: 0, composition: 0.1 },
          { temperature: 0, composition: 0 }
        ],
        labelPosition: { temperature: 400, composition: 0.05 }
      },
      {
        phase: 'TiAl',
        boundaries: [
          { temperature: 1460, composition: 0.5 },
          { temperature: 1800, composition: 0.5 },
          { temperature: 1800, composition: 0.7 },
          { temperature: 0, composition: 0.7 },
          { temperature: 0, composition: 0.5 }
        ],
        labelPosition: { temperature: 800, composition: 0.6 }
      }
    ],
    phaseBoundaries: [
      {
        name: 'Beta Transus',
        points: [
          { temperature: 882, composition: 0 },
          { temperature: 882, composition: 0.1 }
        ]
      },
      {
        name: 'Peritectic',
        points: [
          { temperature: 1460, composition: 0.5 }
        ]
      }
    ]
  },
  'Cu-Zn': {
    elementA: 'Cu',
    elementB: 'Zn',
    systemType: 'Substitutional Solid Solution',
    description: 'Copper-Zinc system forms brass alloys with various phases including alpha and beta brass.',
    minTemp: 0,
    maxTemp: 1200,
    phaseRegions: [
      {
        phase: 'Liquid',
        boundaries: [
          { temperature: 1085, composition: 0 },
          { temperature: 900, composition: 0.4 },
          { temperature: 1200, composition: 0.4 },
          { temperature: 1200, composition: 0 }
        ],
        labelPosition: { temperature: 1100, composition: 0.2 }
      },
      {
        phase: 'Alpha (α)',
        boundaries: [
          { temperature: 1085, composition: 0 },
          { temperature: 900, composition: 0.4 },
          { temperature: 0, composition: 0.4 },
          { temperature: 0, composition: 0 }
        ],
        labelPosition: { temperature: 500, composition: 0.2 }
      },
      {
        phase: 'Beta (β)',
        boundaries: [
          { temperature: 900, composition: 0.4 },
          { temperature: 1200, composition: 0.4 },
          { temperature: 1200, composition: 0.6 },
          { temperature: 0, composition: 0.6 }
        ],
        labelPosition: { temperature: 500, composition: 0.5 }
      }
    ],
    phaseBoundaries: [
      {
        name: 'Alpha-Beta Boundary',
        points: [
          { temperature: 900, composition: 0.4 },
          { temperature: 0, composition: 0.4 }
        ]
      }
    ]
  },
  'Ni-Al': {
    elementA: 'Ni',
    elementB: 'Al',
    systemType: 'Intermetallic',
    description: 'Nickel-Aluminum system forms important superalloy phases including gamma prime for high-temperature applications.',
    minTemp: 0,
    maxTemp: 1700,
    phaseRegions: [
      {
        phase: 'Liquid',
        boundaries: [
          { temperature: 1455, composition: 0 },
          { temperature: 1640, composition: 0.25 },
          { temperature: 1700, composition: 0.25 },
          { temperature: 1700, composition: 0 }
        ],
        labelPosition: { temperature: 1600, composition: 0.12 }
      },
      {
        phase: 'Gamma (γ)',
        boundaries: [
          { temperature: 1455, composition: 0 },
          { temperature: 1640, composition: 0.25 },
          { temperature: 0, composition: 0.25 },
          { temperature: 0, composition: 0 }
        ],
        labelPosition: { temperature: 700, composition: 0.12 }
      },
      {
        phase: 'Gamma Prime (γ\')',
        boundaries: [
          { temperature: 1640, composition: 0.25 },
          { temperature: 1700, composition: 0.25 },
          { temperature: 1700, composition: 0.5 },
          { temperature: 0, composition: 0.5 }
        ],
        labelPosition: { temperature: 800, composition: 0.37 }
      }
    ],
    phaseBoundaries: [
      {
        name: 'Gamma-Gamma Prime',
        points: [
          { temperature: 1640, composition: 0.25 },
          { temperature: 0, composition: 0.25 }
        ]
      }
    ]
  },
  'Mg-Zn': {
    elementA: 'Mg',
    elementB: 'Zn',
    systemType: 'Eutectic with Laves Phase',
    description: 'Magnesium-Zinc system forms Laves phases important for lightweight structural applications.',
    minTemp: 0,
    maxTemp: 700,
    phaseRegions: [
      {
        phase: 'Liquid',
        boundaries: [
          { temperature: 650, composition: 0 },
          { temperature: 340, composition: 0.5 },
          { temperature: 700, composition: 0.5 },
          { temperature: 700, composition: 0 }
        ],
        labelPosition: { temperature: 600, composition: 0.25 }
      },
      {
        phase: 'Alpha (Mg)',
        boundaries: [
          { temperature: 650, composition: 0 },
          { temperature: 340, composition: 0.1 },
          { temperature: 0, composition: 0.1 },
          { temperature: 0, composition: 0 }
        ],
        labelPosition: { temperature: 300, composition: 0.05 }
      },
      {
        phase: 'Laves (MgZn₂)',
        boundaries: [
          { temperature: 340, composition: 0.1 },
          { temperature: 340, composition: 0.67 },
          { temperature: 0, composition: 0.67 },
          { temperature: 0, composition: 0.1 }
        ],
        labelPosition: { temperature: 150, composition: 0.4 }
      }
    ],
    phaseBoundaries: [
      {
        name: 'Eutectic',
        points: [
          { temperature: 340, composition: 0.1 },
          { temperature: 340, composition: 0.67 }
        ]
      }
    ]
  }
};