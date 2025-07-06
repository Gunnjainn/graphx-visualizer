// src/components/MetricsPanel.tsx
import React from 'react';

interface MetricsPanelProps {
  nodesVisited: number;
  timeTaken: number;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ nodesVisited, timeTaken }) => {
  return (
    <div className="absolute top-4 right-4 bg-white shadow-lg rounded-xl p-4 text-sm">
      <div className="font-bold text-lg mb-2">Performance Metrics</div>
      <div>Nodes Visited: {nodesVisited}</div>
      <div>Time Taken: {timeTaken} ms</div>
    </div>
  );
};

export default MetricsPanel;
