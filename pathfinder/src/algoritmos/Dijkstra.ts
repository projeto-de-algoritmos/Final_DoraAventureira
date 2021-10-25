
import { IDijkstra, INodeProperties } from "../interface/interfaces";

import Pathfinder from "./helper";

export default class Dijkstra extends Pathfinder implements IDijkstra {
    static weighted = true;

    traverse(
        grid: Array<Array<INodeProperties>>,
        startNode: INodeProperties,
        endNode: INodeProperties
    ): Array<INodeProperties> | undefined {
        const visitedNodesInOrder = [];
        startNode.distance = 0;
        startNode.weight = 0;
        const unvisited: Array<INodeProperties> = this.getAllNodes(grid);

        while (unvisited.length !== 0) {
            this.sortNodesByDistance(unvisited);
            const closestNode: any = unvisited.shift();
            // If the closest node is at a distance of infinity,
            // we must be trapped and should therefore stop.
            if (closestNode?.distance === Infinity) return visitedNodesInOrder;
            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);
            if (closestNode === endNode) return visitedNodesInOrder;
            let neighbors = this.getUnvisitedNeighbors(closestNode, grid);
            for (const neighbor of neighbors) {
                let newDistance = closestNode.distance + neighbor.weight;
                if (newDistance < neighbor.distance) {
                    neighbor.distance = newDistance;
                    neighbor.previous = closestNode;
                }
            }
        }
    }

    sortNodesByDistance(unvisitedNodes: Array<INodeProperties>): void {
        unvisitedNodes.sort(
            (nodeA: INodeProperties, nodeB: INodeProperties) =>
                nodeA.distance - nodeB.distance
        );
    }
}
export type TDijsktra = typeof Dijkstra;
