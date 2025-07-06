// src/algorithms/BFS.ts
import { Node, Edge } from "reactflow";

export async function runBFS(
  startNodeId: string,
  nodes: Node[],
  edges: Edge[],
  onVisit: (nodeId: string) => void
): Promise<{ nodesVisited: number; timeTaken: number }> {
  const visited = new Set<string>();
  const queue: string[] = [];
  const adjacencyList: Record<string, string[]> = {};

  for (const node of nodes) {
    adjacencyList[node.id] = [];
  }

  for (const edge of edges) {
    adjacencyList[edge.source].push(edge.target);
  }

  queue.push(startNodeId);
  visited.add(startNodeId);
  let nodesVisited = 0;
  const startTime = performance.now();

  while (queue.length > 0) {
    const current = queue.shift()!;
    nodesVisited++;

    onVisit(current);
    await new Promise((resolve) => setTimeout(resolve, 500)); // 👈 animation delay

    for (const neighbor of adjacencyList[current]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }

  const endTime = performance.now();
  const timeTaken = Math.round(endTime - startTime);

  return { nodesVisited, timeTaken };
}
