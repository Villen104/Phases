import { PredictionResult, Phase } from '../types/alloy';
import { phases } from '../data/phases';
import { alloySystems } from '../data/alloySystems';

export class PhasePredictor {
  static predictPhases(elements: string[], temperature: number = 25, composition: string = ''): PredictionResult {
    const sortedElements = elements.sort();
    
    // Find matching alloy system
    const matchingSystem = alloySystems.find(system => 
      system.elements.length === sortedElements.length &&
      system.elements.every(el => sortedElements.includes(el))
    );

    let primaryPhases: Phase[] = [];
    let secondaryPhases: Phase[] = [];
    let microstructure = '';
    let properties: string[] = [];
    let applications: string[] = [];

    if (matchingSystem) {
      primaryPhases = matchingSystem.phases;
    } else {
      // Predict based on individual elements
      primaryPhases = this.predictFromElements(sortedElements, temperature);
    }

    // Temperature-based phase selection
    if (temperature > 1000) {
      primaryPhases = primaryPhases.filter(p => 
        p.name.includes('Austenite') || 
        p.name.includes('Beta') || 
        p.temperature?.includes('high') ||
        p.name.includes('Gamma Prime')
      );
      microstructure = 'High-temperature phases with coarse grain structure';
    } else if (temperature > 500) {
      primaryPhases = primaryPhases.filter(p => 
        !p.name.includes('Martensite') && 
        !p.temperature?.includes('Below')
      );
      microstructure = 'Mixed phase structure with intermediate temperature phases';
    } else {
      microstructure = 'Fine-grained structure with room temperature stable phases';
    }

    // Add secondary phases based on composition
    if (elements.includes('Cr') && elements.includes('Fe')) {
      const sigmaPhase = phases.find(p => p.name === 'Sigma Phase (σ)');
      if (sigmaPhase && temperature > 600 && temperature < 1000) {
        secondaryPhases.push(sigmaPhase);
      }
    }

    if (elements.includes('Mg') && elements.includes('Zn')) {
      const lavesPhase = phases.find(p => p.name === 'Laves Phase');
      if (lavesPhase) {
        primaryPhases.push(lavesPhase);
      }
    }

    // Determine properties and applications
    properties = this.determineProperties(primaryPhases, secondaryPhases);
    applications = this.determineApplications(elements, primaryPhases);

    return {
      primaryPhases,
      secondaryPhases,
      temperature: `${temperature}°C`,
      composition: composition || this.generateComposition(elements),
      microstructure,
      properties,
      applications
    };
  }

  private static predictFromElements(elements: string[], temperature: number): Phase[] {
    const predictedPhases: Phase[] = [];

    // Iron-based predictions
    if (elements.includes('Fe')) {
      if (temperature > 912) {
        const austenite = phases.find(p => p.name === 'Austenite (γ-Fe)');
        if (austenite) predictedPhases.push(austenite);
      } else {
        const ferrite = phases.find(p => p.name === 'Ferrite (α-Fe)');
        if (ferrite) predictedPhases.push(ferrite);
      }

      if (elements.includes('C')) {
        const cementite = phases.find(p => p.name === 'Cementite (Fe₃C)');
        if (cementite) predictedPhases.push(cementite);
      }
    }

    // Titanium-based predictions
    if (elements.includes('Ti')) {
      if (temperature > 882) {
        const beta = phases.find(p => p.name === 'Beta Phase (β)');
        if (beta) predictedPhases.push(beta);
      } else {
        const alpha = phases.find(p => p.name === 'Alpha Phase (α)');
        if (alpha) predictedPhases.push(alpha);
      }
    }

    // Nickel-based superalloy predictions
    if (elements.includes('Ni') && (elements.includes('Al') || elements.includes('Ti'))) {
      const gammaPrime = phases.find(p => p.name === 'Gamma Prime (γ\')');
      if (gammaPrime) predictedPhases.push(gammaPrime);
    }

    return predictedPhases;
  }

  private static determineProperties(primaryPhases: Phase[], secondaryPhases: Phase[]): string[] {
    const allPhases = [...primaryPhases, ...secondaryPhases];
    const properties = new Set<string>();

    allPhases.forEach(phase => {
      phase.properties.forEach(prop => properties.add(prop));
    });

    return Array.from(properties);
  }

  private static determineApplications(elements: string[], phases: Phase[]): string[] {
    const applications = new Set<string>();

    // Element-based applications
    if (elements.includes('Ti')) {
      applications.add('Aerospace components');
      applications.add('Biomedical implants');
      applications.add('Chemical processing equipment');
    }

    if (elements.includes('Ni') && elements.includes('Cr')) {
      applications.add('Gas turbine engines');
      applications.add('Nuclear reactors');
      applications.add('High-temperature furnaces');
    }

    if (elements.includes('Fe') && elements.includes('C')) {
      applications.add('Structural steel');
      applications.add('Automotive components');
      applications.add('Construction materials');
    }

    if (elements.includes('Al')) {
      applications.add('Lightweight structures');
      applications.add('Transportation industry');
      applications.add('Packaging materials');
    }

    // Phase-based applications
    phases.forEach(phase => {
      phase.commonIn.forEach(app => applications.add(app));
    });

    return Array.from(applications);
  }

  private static generateComposition(elements: string[]): string {
    if (elements.length === 2) {
      return `${elements[0]}-${elements[1]} binary alloy`;
    } else if (elements.length === 3) {
      return `${elements[0]}-${elements[1]}-${elements[2]} ternary alloy`;
    } else {
      return `Multi-component alloy with ${elements.length} elements`;
    }
  }
}