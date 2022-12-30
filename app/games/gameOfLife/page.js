"use client"
import React, { useRef, useState } from 'react';

const CELL_SIZE = 20; // size of each cell in pixels
const UPDATE_INTERVAL = 100; // update interval in milliseconds

function GameOfLife() {
  const canvasRef = useRef(null);
  const [board, setBoard] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(UPDATE_INTERVAL);
  const [boardSize, setBoardSize] = useState(20);

  // Initialize the board when the component mounts
  React.useEffect(() => {
    const board = createBoard(boardSize);
    setBoard(board);
  }, []);

  // Update the board and draw to canvas when the component updates
  React.useEffect(() => {
    if (isRunning) {
      const nextBoard = updateBoard(board);
      setBoard(nextBoard);
      drawBoard(canvasRef.current, nextBoard);
      setTimeout(() => {
        requestAnimationFrame(() => {
          setIsRunning(true);
        });
      }, speed);
    }
  }, [board, isRunning, speed]);

  // Handle clicking on the canvas to toggle cell state
  function handleCanvasClick(event) {
    const { offsetX, offsetY } = event;
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
      const newBoard = toggleCell(board, x, y);
      setBoard(newBoard);
      drawBoard(canvasRef.current, newBoard);
    }
  }

  // Handle changing the speed slider
  function handleSpeedChange(event) {
    setSpeed(event.target.value);
  }

  // Handle changing the board size slider
  function handleBoardSizeChange(event) {
    setBoardSize(event.target.value);
  }

  // Start/stop the game when the start/stop button is clicked
  function handleStartStopClick() {
    setIsRunning(!isRunning);
  }

  return (
    <div>
      <canvas
        width={CELL_SIZE * boardSize}
        height={CELL_SIZE * boardSize}
        ref={canvasRef}
        onClick={handleCanvasClick}
      />
      <div>
        <label>
          Speed:
          <input
            type="range"
            min={50}
            max={1000}
            value={speed}
            onChange={handleSpeedChange}
          />
        </label>
      </div>
      <div>
        <label>
          Board size:
          <input
            type="range"
            min={10}
            max={50}
            value={boardSize}
            onChange={handleBoardSizeChange}
          />
        </label>
      </div>
      <button onClick={handleStartStopClick}> start</button>
    </div>
    );
}

export default GameOfLife;