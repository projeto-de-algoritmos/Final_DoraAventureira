
import { IDFS, INodeProperties } from "../interface/interfaces";
import Helper from "./helper";
export default class DFS extends Helper implements IDFS {
    static weighted = false;
    static _time = 25;
    
    traverse(
        grid: Array<Array<INodeProperties>>,
        startNode: INodeProperties,
        endNode: INodeProperties
    ): Array<INodeProperties> | undefined {
        const unvisited = [];
        const visitedNodesInOrder = [];
        startNode.isVisited = true;
        startNode.previous = null;
        unvisited.push(startNode);
        visitedNodesInOrder.push(startNode);
        while (unvisited.length !== 0) {
            //console.log(unvisited);
            let currentNode: any = unvisited.pop();
            if (currentNode === endNode) return visitedNodesInOrder;
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);
            let neighbors = this.getUnvisitedNeighbors(currentNode, grid);

            for (const neighbor of neighbors) {
                neighbor.previous = currentNode;
                unvisited.push(neighbor);
            }
        }
        return visitedNodesInOrder;
    }
}
export type TDFS = typeof DFS;
