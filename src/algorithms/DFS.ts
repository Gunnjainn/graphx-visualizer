// src/algorithms/DFS.ts

import { Edge, Node } from "reactflow";

interface DFSOptions {
  nodes: Node[];
  edges: Edge[];
  startNodeId: string;
  onVisit?: (nodeId: string) => void;
}

export async function runDFS(
  startNodeId: string,
  nodes: Node[],
  edges: Edge[],
  onVisit: (nodeId: string) => void
): Promise<{ nodesVisited: number; timeTaken: number }> {
  const visited = new Set<string>();
  const adjacencyList: Record<string, string[]> = {};

  // Build adjacency list
  for (const node of nodes) {
    adjacencyList[node.id] = [];
  }
  for (const edge of edges) {
    adjacencyList[edge.source].push(edge.target);
  }

  let nodesVisited = 0;
  const startTime = performance.now();

  async function dfs(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    nodesVisited++;

    onVisit(nodeId);
    await new Promise((resolve) => setTimeout(resolve, 500)); // 👈 delay for animation

    for (const neighbor of adjacencyList[nodeId]) {
      await dfs(neighbor);
    }
  }

  await dfs(startNodeId);

  const endTime = performance.now();
  const timeTaken = Math.round(endTime - startTime);

  return { nodesVisited, timeTaken };
}
