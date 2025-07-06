import React from 'react';
import { useReactFlow } from 'reactflow';

let nodeIdCounter = 4;

const AddRemoveControls = () => {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();

  const addNode = () => {
    const newNode = {
      id: `${nodeIdCounter}`,
      data: { label: `${nodeIdCounter}` },
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
    };
    nodeIdCounter++;
    setNodes([...getNodes(), newNode]);
  };

  const removeLastNode = () => {
    const currentNodes = getNodes();
    if (currentNodes.length <= 0) return;
    const lastNode = currentNodes[currentNodes.length - 1];
    setNodes(currentNodes.slice(0, -1));
    setEdges(getEdges().filter(e => e.source !== lastNode.id && e.target !== lastNode.id));
  };

  const addRandomEdge = () => {
    const nodes = getNodes();
    if (nodes.length < 2) return;
    const [source, target] = [
      nodes[Math.floor(Math.random() * nodes.length)],
      nodes[Math.floor(Math.random() * nodes.length)],
    ];
    if (source.id === target.id) return;
    const newEdge = {
      id: `e${source.id}-${target.id}`,
      source: source.id,
      target: target.id,
      animated: true,
    };
    setEdges([...getEdges(), newEdge]);
  };

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 p-2 bg-white shadow-lg rounded">
      <button onClick={addNode} className="bg-blue-500 text-white px-3 py-1 rounded">Add Node</button>
      <button onClick={removeLastNode} className="bg-red-500 text-white px-3 py-1 rounded">Remove Node</button>
      <button onClick={addRandomEdge} className="bg-green-500 text-white px-3 py-1 rounded">Add Edge</button>
    </div>
  );
};

export default AddRemoveControls;
