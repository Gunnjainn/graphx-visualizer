// src/components/ui/DFSButton.tsx

import { Button } from "./button"; // Make sure this exists or adjust the path
import { useReactFlow } from "reactflow";
import { runDFS } from "../../algorithms/DFS";
import { Node, Edge } from "reactflow";

interface Props {
  setMetrics: (metrics: { nodesVisited: number; timeTaken: number }) => void;
}

const DFSButton = ({ setMetrics }: Props) => {
  const { getNodes, getEdges, setNodes } = useReactFlow();

  const handleDFS = async () => {
    const nodes: Node[] = getNodes();
    const edges: Edge[] = getEdges();

    const result = await runDFS("1", nodes, edges, (nodeId: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, style: { ...node.style, backgroundColor: "#ffa" } }
            : node
        )
      );
    });

    setMetrics(result);
  };

  return <Button onClick={handleDFS}>Run DFS</Button>;
};

export default DFSButton;
