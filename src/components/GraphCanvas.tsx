// src/components/GraphCanvas.tsx

import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";
import GraphControls from "./GraphControls";
import DFSButton from "./ui/DFSButton";
import BFSButton from "./ui/BFSButton";
import DijkstraButton from "./ui/DijkstraButton";
import MetricsPanel from "./MetricsPanel";

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "1" },
    position: { x: 100, y: 100 },
    style: { background: "#eee" },
  },
  {
    id: "2",
    data: { label: "2" },
    position: { x: 300, y: 100 },
    style: { background: "#eee" },
  },
];

const initialEdges: Edge[] = [];

const GraphCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [metrics, setMetrics] = useState({
    nodesVisited: 0,
    timeTaken: 0,
  });

  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const handleAddNode = () => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      data: { label: (nodes.length + 1).toString() },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      style: { background: "#eee" },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleRemoveNode = () => {
    setNodes((nds) => nds.slice(0, -1));
  };

  return (
    <ReactFlowProvider>
      <div className="w-screen h-screen">
        <GraphControls
          onAddNode={handleAddNode}
          onRemoveNode={handleRemoveNode}
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>

        <div className="p-4 space-x-2">
          <DFSButton setMetrics={setMetrics} />
          <BFSButton setMetrics={setMetrics} />
          <DijkstraButton setMetrics={setMetrics} />
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default GraphCanvas;
