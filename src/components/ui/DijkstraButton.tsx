// src/components/ui/DijkstraButton.tsx

import { Button } from "./button";
import { useReactFlow } from "reactflow";
import { runDijkstra } from "../../algorithms/Dijkstra";
import { Node, Edge } from "reactflow";

interface Props {
  setMetrics: (metrics: { nodesVisited: number; timeTaken: number }) => void;
}

const DijkstraButton = ({ setMetrics }: Props) => {
  const { getNodes, getEdges, setNodes } = useReactFlow();

  const handleDijkstra = async () => {
    const nodes: Node[] = getNodes();
    const edges: Edge[] = getEdges();

    const result = await runDijkstra({
      nodes,
      edges,
      startNodeId: "1",
      onVisit: (nodeId: string) => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === nodeId
              ? { ...node, style: { ...node.style, backgroundColor: "#c292a1" } }
              : node
          )
        );
      },
    });

    setMetrics(result);
  };

  return <Button onClick={handleDijkstra}>Run Dijkstra</Button>;
};

export default DijkstraButton;
