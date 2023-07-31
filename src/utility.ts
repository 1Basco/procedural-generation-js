import { generateProceduralGrid } from "./procedural";

//Grid and elements
export const elementTypes = ["water", "sand", "grass", "trees"];

export const adjacencyRules = {
  water: ["sand", "water"],
  sand: ["water", "grass", "sand"],
  grass: ["trees", "sand", "grass"],
  trees: ["grass", "trees"],
};

export const gridSize = 100;

const createEmptyGrid = () => {
  return Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(undefined)
  );
};

const emptyGrid = createEmptyGrid();

interface ProceduralGrid {
  grid: (string | undefined)[][];
  seed: string;
}

export const { grid, seed }: ProceduralGrid = generateProceduralGrid(
  emptyGrid,
  elementTypes,
  adjacencyRules
);

// Canvas info

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

export const ctx = canvas.getContext("2d");

export function drawGrid(grid: any[][]) {
  const cellWidth = canvas.width / gridSize;
  const cellHeight = canvas.height / gridSize;

  // Clear the canvas
  ctx?.clearRect(0, 0, canvas.width, canvas.height);

  // Loop through the grid and draw each cell based on its type
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const cellType = grid[x][y];
      if (cellType) {
        if (ctx) {
          // Set the fill color based on the cell type
          switch (cellType) {
            case "water":
              ctx.fillStyle = "blue";
              break;
            case "sand":
              ctx.fillStyle = "peachpuff";
              break;
            case "grass":
              ctx.fillStyle = "chartreuse";
              break;
            case "trees":
              ctx.fillStyle = "green";
              break;
            default:
              ctx.fillStyle = "white";
              break;
          }
        }

        // Draw the cell
        ctx?.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
    }
  }
}
