import React, { useEffect } from 'react';

interface GridProps {
  width: number;
  height: number;
}

const Grid: React.FC<GridProps> = ({ width, height }) => {
  let grid: number[][];
  let velocityGrid: number[][];
  const cellSize = 5;
  let cols: number;
  let rows: number;
  let hueValue = 200;
  const gravity = 0.1;

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function make2DArray(cols: number, rows: number) {
    return new Array(cols).fill(0).map(() => new Array(rows).fill(0));
  }

  function withinCols(i: number) {
    return i >= 0 && i <= cols - 1;
  }

  function withinRows(j: number) {
    return j >= 0 && j <= rows - 1;
  }

  function setup() {
    cols = Math.floor(width / cellSize);
    rows = Math.floor(height / cellSize);
    grid = make2DArray(cols, rows);
    velocityGrid = make2DArray(cols, rows);
  }

  function mouseDragged() {
    // Implement if needed
  }

  function draw() {
    // Your draw logic here
  }

  return (
    <div>
      <canvas id="canvas" width={width} height={height}></canvas>
    </div>
  );
};

export default Grid;
