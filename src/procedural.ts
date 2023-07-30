export function generateProceduralGrid(
  grid: (string | undefined)[][],
  elementTypes: any[],
  adjacencyRules: { [x: string]: string[] }
) {
  function getNeighbors(x: number, y: number) {
    const neighbors = [];
    if (x > 0) neighbors.push(grid[x - 1][y]);
    if (x < grid.length - 1) neighbors.push(grid[x + 1][y]);
    if (y > 0) neighbors.push(grid[x][y - 1]);
    if (y < grid[0].length - 1) neighbors.push(grid[x][y + 1]);
    return neighbors;
  }

  function canBeAdjacent(element1: string, element2: string | undefined) {
    if (element2 === undefined || adjacencyRules[element1].includes(element2)) {
      return true;
    }

    return false;
  }

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const startX = 0; // Always start from the top left corner
  const startY = 0; // Always start from the top left corner
  const startElementType =
    elementTypes[Math.floor(Math.random() * elementTypes.length)];

  grid[startX][startY] = startElementType;

  // Create a stack to keep track of backtracking points
  const stack = [{ x: startX, y: startY }];

  function findSuitableElement(x: number, y: number) {
    const neighbors = getNeighbors(x, y);
    if (Math.floor(Math.random() * 10) < 7) {
      //water percentage
      shuffleArray(elementTypes);
    } else {
      elementTypes.filter((element) => {
        element !== "water";
      });
      shuffleArray(elementTypes);
    }

    for (const elementType of elementTypes) {
      const canBeAdded = neighbors.every((neighbor) =>
        canBeAdjacent(elementType, neighbor)
      );
      if (canBeAdded) {
        grid[x][y] = elementType;
        stack.push({ x, y });
        // Break the loop once a valid element is placed
        break;
      }
    }
  }

  while (stack.length > 0) {
    const lastCell = stack.pop();

    const { x, y } = lastCell ?? { x: 0, y: 0 };

    // get the next cell
    if (x + 1 < grid.length) {
      findSuitableElement(x + 1, y);
    } else if (y + 1 < grid[0].length) {
      findSuitableElement(0, y + 1);
    }
  }
  return grid;
}
