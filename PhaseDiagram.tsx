import React, { useMemo } from 'react';
import { BinarySystem, PhaseRegion } from '../types/phase';

interface PhaseDiagramProps {
  system: BinarySystem | null;
  currentTemp: number;
  currentComp: number;
  onPointClick: (temp: number, comp: number) => void;
  crosshairPosition: {x: number, y: number} | null;
}

const PhaseDiagram: React.FC<PhaseDiagramProps> = ({ 
  system, 
  currentTemp, 
  currentComp, 
  onPointClick,
  crosshairPosition 
}) => {
  const diagramWidth = 500;
  const diagramHeight = 400;
  const margin = { top: 40, right: 40, bottom: 60, left: 80 };
  const plotWidth = diagramWidth - margin.left - margin.right;
  const plotHeight = diagramHeight - margin.top - margin.bottom;

  const scales = useMemo(() => {
    const maxTemp = system?.maxTemp || 2000;
    const minTemp = system?.minTemp || 0;
    
    return {
      x: (comp: number) => margin.left + comp * plotWidth,
      y: (temp: number) => margin.top + (1 - (temp - minTemp) / (maxTemp - minTemp)) * plotHeight,
      xInverse: (x: number) => (x - margin.left) / plotWidth,
      yInverse: (y: number) => {
        const normalizedY = 1 - (y - margin.top) / plotHeight;
        return minTemp + normalizedY * (maxTemp - minTemp);
      }
    };
  }, [system, margin, plotWidth, plotHeight]);

  const handleClick = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const comp = Math.max(0, Math.min(1, scales.xInverse(x)));
    const temp = Math.max(system?.minTemp || 0, Math.min(system?.maxTemp || 2000, scales.yInverse(y)));
    
    onPointClick(Math.round(temp), comp);
  };

  const getPhaseColor = (phaseName: string) => {
    const colors: { [key: string]: string } = {
      'Liquid': '#ff6b6b',
      'Austenite': '#4ecdc4',
      'Ferrite': '#45b7d1',
      'Cementite': '#96ceb4',
      'Pearlite': '#feca57',
      'Martensite': '#ff9ff3',
      'Alpha': '#54a0ff',
      'Beta': '#5f27cd',
      'Gamma': '#00d2d3',
      'Delta': '#ff9f43',
      'Sigma': '#ee5a24',
      'Laves': '#0abde3',
      'Intermetallic': '#c44569',
      'Solid Solution': '#40739e'
    };
    
    // Find matching color by checking if phase name contains key
    for (const [key, color] of Object.entries(colors)) {
      if (phaseName.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }
    
    return '#95a5a6'; // Default gray
  };

  if (!system) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center text-gray-500">
          <div className="text-lg font-medium mb-2">No Phase Diagram Available</div>
          <div className="text-sm">Select a different element combination</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <svg 
        width={diagramWidth} 
        height={diagramHeight} 
        className="border border-gray-200 rounded-lg cursor-crosshair"
        onClick={handleClick}
      >
        {/* Background */}
        <rect 
          x={margin.left} 
          y={margin.top} 
          width={plotWidth} 
          height={plotHeight} 
          fill="white" 
          stroke="#e5e7eb"
        />

        {/* Phase Regions */}
        {system.phaseRegions.map((region, index) => (
          <g key={index}>
            <polygon
              points={region.boundaries.map(point => 
                `${scales.x(point.composition)},${scales.y(point.temperature)}`
              ).join(' ')}
              fill={getPhaseColor(region.phase)}
              fillOpacity={0.6}
              stroke={getPhaseColor(region.phase)}
              strokeWidth={1}
            />
            {/* Phase Label */}
            <text
              x={scales.x(region.labelPosition.composition)}
              y={scales.y(region.labelPosition.temperature)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-800"
              style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
            >
              {region.phase}
            </text>
          </g>
        ))}

        {/* Phase Boundaries */}
        {system.phaseBoundaries.map((boundary, index) => (
          <polyline
            key={index}
            points={boundary.points.map(point => 
              `${scales.x(point.composition)},${scales.y(point.temperature)}`
            ).join(' ')}
            fill="none"
            stroke="#374151"
            strokeWidth={2}
          />
        ))}

        {/* Grid Lines */}
        {/* Vertical grid lines (composition) */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(comp => (
          <line
            key={`v-${comp}`}
            x1={scales.x(comp)}
            y1={margin.top}
            x2={scales.x(comp)}
            y2={margin.top + plotHeight}
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray="2,2"
          />
        ))}

        {/* Horizontal grid lines (temperature) */}
        {Array.from({ length: 6 }, (_, i) => {
          const temp = system.minTemp + (i * (system.maxTemp - system.minTemp)) / 5;
          return (
            <line
              key={`h-${temp}`}
              x1={margin.left}
              y1={scales.y(temp)}
              x2={margin.left + plotWidth}
              y2={scales.y(temp)}
              stroke="#e5e7eb"
              strokeWidth={1}
              strokeDasharray="2,2"
            />
          );
        })}

        {/* Current Point */}
        <circle
          cx={scales.x(currentComp)}
          cy={scales.y(currentTemp)}
          r={6}
          fill="#dc2626"
          stroke="white"
          strokeWidth={2}
        />

        {/* Crosshair */}
        {crosshairPosition && (
          <g>
            <line
              x1={margin.left}
              y1={scales.y(currentTemp)}
              x2={margin.left + plotWidth}
              y2={scales.y(currentTemp)}
              stroke="#dc2626"
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.7}
            />
            <line
              x1={scales.x(currentComp)}
              y1={margin.top}
              x2={scales.x(currentComp)}
              y2={margin.top + plotHeight}
              stroke="#dc2626"
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.7}
            />
          </g>
        )}

        {/* Axes */}
        {/* X-axis */}
        <line
          x1={margin.left}
          y1={margin.top + plotHeight}
          x2={margin.left + plotWidth}
          y2={margin.top + plotHeight}
          stroke="#374151"
          strokeWidth={2}
        />

        {/* Y-axis */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + plotHeight}
          stroke="#374151"
          strokeWidth={2}
        />

        {/* X-axis labels */}
        {[0, 20, 40, 60, 80, 100].map(percent => (
          <text
            key={`x-label-${percent}`}
            x={scales.x(percent / 100)}
            y={margin.top + plotHeight + 20}
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            {percent}%
          </text>
        ))}

        {/* Y-axis labels */}
        {Array.from({ length: 6 }, (_, i) => {
          const temp = system.minTemp + (i * (system.maxTemp - system.minTemp)) / 5;
          return (
            <text
              key={`y-label-${temp}`}
              x={margin.left - 10}
              y={scales.y(temp)}
              textAnchor="end"
              dominantBaseline="middle"
              className="text-xs fill-gray-600"
            >
              {Math.round(temp)}
            </text>
          );
        })}

        {/* Axis titles */}
        <text
          x={margin.left + plotWidth / 2}
          y={diagramHeight - 10}
          textAnchor="middle"
          className="text-sm font-medium fill-gray-700"
        >
          Composition (% {system.elementB})
        </text>

        <text
          x={20}
          y={margin.top + plotHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-90, 20, ${margin.top + plotHeight / 2})`}
          className="text-sm font-medium fill-gray-700"
        >
          Temperature (°C)
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Phase Legend:</h4>
        <div className="grid grid-cols-2 gap-2">
          {Array.from(new Set(system.phaseRegions.map(r => r.phase))).map(phase => (
            <div key={phase} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded border"
                style={{ backgroundColor: getPhaseColor(phase) }}
              />
              <span className="text-xs text-gray-600">{phase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhaseDiagram;