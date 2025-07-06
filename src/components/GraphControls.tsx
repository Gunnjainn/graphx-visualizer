// src/components/GraphControls.tsx

import React from 'react';

type Props = {
  onAddNode: () => void;
  onRemoveNode: () => void;
};

export default function GraphControls({ onAddNode, onRemoveNode }: Props) {
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 p-4 bg-white rounded-xl shadow-md z-50">
      <button onClick={onAddNode} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add Node
      </button>
      <button onClick={onRemoveNode} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Remove Node
      </button>
    </div>
  );
}
