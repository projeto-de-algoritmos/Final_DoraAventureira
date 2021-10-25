import { IHelper, INodeProperties } from "../interface/interfaces";

export default class Helper implements IHelper {
    static _time = 12.5;
    getUnvisitedNeighbors(
        node: INodeProperties,
        grid: Array<Array<INodeProperties>>
    ): Array<INodeProperties> {
        let neighbors = [];
        const { col, row } = node;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
        neighbors = neighbors.filter((neighbor) => !neighbor.isVisited);
        return neighbors.filter((neighbor) => !neighbor.isWall);
    }

    getShortestPath(
        startNode: INodeProperties,
        endNode: INodeProperties
    ): Array<INodeProperties> {
        const shortestPath = [];
        let currentNode = endNode;
        while (currentNode !== null && currentNode !== startNode) {
            shortestPath.unshift(currentNode);
            currentNode = currentNode.previous;
        }
        shortestPath.unshift(startNode);
        return shortestPath;
    }

    getAllNodes(grid: Array<Array<INodeProperties>>): Array<INodeProperties> {
        const nodes = [];
        for (let i = 0; i < DefaultValues.DefaultRows; i++) {
            for (let j = 0; j < DefaultValues.DefaultColumns; j++) {
                if (grid[i][j].isVisited || grid[i][j].isWall) continue;
                nodes.push(grid[i][j]);
            }
        }
        return nodes;
    }
}

export const ALGORITHM = {
    DIJKSTRA: "Dijkstra",
    BFS: "Bfs",
    DFS: "Dfs",
};
export const uuidv4 = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
export class DefaultValues {
    static DefaultRows: number = 13;
    static DefaultColumns: number = 35;
    static DEFAULT_START = [6, 5];
    static DEFAULT_END = [6, 29];

    static setRoworColumn(value: number, type: string) {
        if (type === "rows") DefaultValues.DefaultRows = value;
        if (type === "columns") DefaultValues.DefaultColumns = value;
    }

    static setStartOrEnd(value: Array<number>, type: string) {
        if (type === "start") DefaultValues.DEFAULT_START = value;
        if (type === "end") DefaultValues.DEFAULT_END = value;
    }
}
