// src/algorithms/Dijkstra.ts
import { Node, Edge } from "reactflow";

interface DijkstraParams {
  nodes: Node[];
  edges: Edge[];
  startNodeId: string;
  onVisit: (nodeId: string) => void;
}

export async function runDijkstra({
  nodes,
  edges,
  startNodeId,
  onVisit,
}: DijkstraParams): Promise<{ nodesVisited: number; timeTaken: number }> {
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const adjacencyList: Record<string, { node: string; weight: number }[]> = {};

  // Initialize adjacency list
  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    adjacencyList[node.id] = [];
  });

  edges.forEach((edge) => {
    const weight = edge.data?.weight ?? 1; // default weight = 1
    adjacencyList[edge.source].push({ node: edge.target, weight });
  });

  distances[startNodeId] = 0;

  const unvisited = [...nodes.map((node) => node.id)];
  const startTime = performance.now();
  let nodesVisited = 0;

  while (unvisited.length > 0) {
    const current = unvisited.reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    if (distances[current] === Infinity) break;

    unvisited.splice(unvisited.indexOf(current), 1);
    visited.add(current);
    nodesVisited++;

    onVisit(current);
    await new Promise((res) => setTimeout(res, 500));

    for (const neighbor of adjacencyList[current]) {
      const alt = distances[current] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
      }
    }
  }

  const endTime = performance.now();

  return {
    nodesVisited,
    timeTaken: Math.round(endTime - startTime),
  };
}
