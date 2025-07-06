// src/components/ui/BFSButton.tsx

import { Button } from "./button";
import { useReactFlow } from "reactflow";
import { runBFS } from "../../algorithms/BFS";
import { Node, Edge } from "reactflow";

interface Props {
  setMetrics: (metrics: { nodesVisited: number; timeTaken: number }) => void;
}

const BFSButton = ({ setMetrics }: Props) => {
  const { getNodes, getEdges, setNodes } = useReactFlow();

  const handleBFS = async () => {
    const nodes: Node[] = getNodes();
    const edges: Edge[] = getEdges();

    const result = await runBFS("1", nodes, edges, (nodeId: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, style: { ...node.style, backgroundColor: "#aff" } }
            : node
        )
      );
    });

    setMetrics(result);
  };

  return <Button onClick={handleBFS}>Run BFS</Button>;
};

export default BFSButton;
