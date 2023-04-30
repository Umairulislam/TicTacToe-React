import React, { useState } from "react"

// Child Component
// Square component to render each square on the board
const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

// Parent Component
// Board component to render the tic-tac-toe board and handle game logic
const Board = ({ xIsNext, squares, onPlay }) => {
  // Function to handle when a square is clicked
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    // Create a copy of the squares array to update the state
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }

  // Determine the winner of the game, if any
  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  // Render the tic-tac-toe board using the Square component
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  )
}

// Game component to handle the overall state of the game
const Game = () => {
  // Set up the initial state of the game
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  // Function to handle when a player makes a move
  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  // Function to jump to a specific move in the game history
  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove)
  }

  // Create a list of all the moves played in the game
  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = "Go to move # " + move
    } else {
      description = "Go to game start "
    }
    // Return a button that jumps to the selected move when clicked
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          style={{
            cursor: "pointer",
            background: "#0066FF",
            border: "none",
            padding: "4px",
            color: "white",
            fontSize: "20px"
          }}
        >
          {description}
        </button>
      </li>
    )
  })

  // Render the game board and history of moves
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// Determine Winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  if (!squares.includes(null)) {
    return "None"
  }
  return null
}
export default Game

// In React, it’s conventional to use onSomething names for props which represent events and
// handleSomething for the function definitions which handle those events.
