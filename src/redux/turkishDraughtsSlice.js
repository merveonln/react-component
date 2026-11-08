import { createSlice } from "@reduxjs/toolkit";

const BOARD_SIZE = 8;
const DIRECTIONS = [
  { row: -1, col: 0 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
];

function createInitialBoard() {
  const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));

  for (let col = 0; col < BOARD_SIZE; col += 1) {
    board[1][col] = "b";
    board[2][col] = "b";
    board[5][col] = "w";
    board[6][col] = "w";
  }

  return board;
}

function getOwner(piece) {
  if (!piece) return null;
  return piece.toLowerCase() === "w" ? "white" : "black";
}

function isKing(piece) {
  return piece === "W" || piece === "B";
}

function inBounds(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function getPieceCaptureSteps(board, row, col, piece, lastDirection = null) {
  const owner = getOwner(piece);
  const directions = isKing(piece)
    ? DIRECTIONS
    : [
      { row: owner === "white" ? -1 : 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];
  const steps = [];

  directions.forEach((direction) => {
    if (
      isKing(piece) &&
      lastDirection &&
      direction.row === -lastDirection.row &&
      direction.col === -lastDirection.col
    ) {
      return;
    }

    if (isKing(piece)) {
      let scanRow = row + direction.row;
      let scanCol = col + direction.col;

      while (inBounds(scanRow, scanCol) && !board[scanRow][scanCol]) {
        scanRow += direction.row;
        scanCol += direction.col;
      }

      if (!inBounds(scanRow, scanCol) || getOwner(board[scanRow][scanCol]) === owner) {
        return;
      }

      const captured = { row: scanRow, col: scanCol };
      let landingRow = scanRow + direction.row;
      let landingCol = scanCol + direction.col;

      while (inBounds(landingRow, landingCol) && !board[landingRow][landingCol]) {
        steps.push({
          to: { row: landingRow, col: landingCol },
          captured,
          direction,
        });
        landingRow += direction.row;
        landingCol += direction.col;
      }
      return;
    }

    const capturedRow = row + direction.row;
    const capturedCol = col + direction.col;
    const landingRow = row + direction.row * 2;
    const landingCol = col + direction.col * 2;

    if (
      inBounds(landingRow, landingCol) &&
      getOwner(board[capturedRow]?.[capturedCol]) === (owner === "white" ? "black" : "white") &&
      !board[landingRow][landingCol]
    ) {
      steps.push({
        to: { row: landingRow, col: landingCol },
        captured: { row: capturedRow, col: capturedCol },
        direction,
      });
    }
  });

  return steps;
}

function copyAndApplyStep(board, from, to, captured) {
  const nextBoard = board.map((row) => [...row]);
  const piece = nextBoard[from.row][from.col];
  nextBoard[from.row][from.col] = null;

  if (captured) {
    nextBoard[captured.row][captured.col] = null;
  }

  nextBoard[to.row][to.col] = piece;
  return nextBoard;
}

function findCaptureSequences(board, from, piece, path = [], lastDirection = null) {
  const steps = getPieceCaptureSteps(board, from.row, from.col, piece, lastDirection);

  if (!steps.length) {
    return path.length ? [path] : [];
  }

  return steps.flatMap((step) => {
    const nextBoard = copyAndApplyStep(board, from, step.to, step.captured);
    return findCaptureSequences(
      nextBoard,
      step.to,
      piece,
      [...path, step],
      step.direction
    );
  });
}

export function getLegalMoves(board, side) {
  const captures = [];

  board.forEach((row, rowIndex) => row.forEach((piece, colIndex) => {
    if (getOwner(piece) !== side) return;

    findCaptureSequences(board, { row: rowIndex, col: colIndex }, piece)
      .forEach((sequence) => captures.push({ from: { row: rowIndex, col: colIndex }, sequence }));
  }));

  if (captures.length) {
    const maximumCaptures = Math.max(...captures.map((move) => move.sequence.length));
    return captures.filter((move) => move.sequence.length === maximumCaptures);
  }

  const moves = [];
  board.forEach((row, rowIndex) => row.forEach((piece, colIndex) => {
    if (getOwner(piece) !== side) return;

    const directions = isKing(piece)
      ? DIRECTIONS
      : [
        { row: side === "white" ? -1 : 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ];

    directions.forEach((direction) => {
      let nextRow = rowIndex + direction.row;
      let nextCol = colIndex + direction.col;

      while (inBounds(nextRow, nextCol) && !board[nextRow][nextCol]) {
        moves.push({
          from: { row: rowIndex, col: colIndex },
          sequence: [{ to: { row: nextRow, col: nextCol }, captured: null, direction }],
        });

        if (!isKing(piece)) break;
        nextRow += direction.row;
        nextCol += direction.col;
      }
    });
  }));

  return moves;
}

function clearSelection(state) {
  state.selectedFrom = null;
  state.selectedMoves = [];
  state.pendingSequences = [];
}

function countPieces(board, side) {
  return board.flat().filter((piece) => getOwner(piece) === side).length;
}

function finishTurn(state, movingSide, finalPosition) {
  const piece = state.board[finalPosition.row][finalPosition.col];

  if (movingSide === "white" && finalPosition.row === 0 && piece === "w") {
    state.board[finalPosition.row][finalPosition.col] = "W";
  } else if (movingSide === "black" && finalPosition.row === BOARD_SIZE - 1 && piece === "b") {
    state.board[finalPosition.row][finalPosition.col] = "B";
  }

  const nextSide = movingSide === "white" ? "black" : "white";
  state.turn = nextSide;
  clearSelection(state);

  if (countPieces(state.board, "white") === 1 && countPieces(state.board, "black") === 1) {
    state.status = "draw";
    return;
  }

  if (countPieces(state.board, nextSide) === 0 || getLegalMoves(state.board, nextSide).length === 0) {
    state.status = "won";
    state.winner = movingSide;
  }
}

function applyCaptureStep(state, from, step) {
  state.board = copyAndApplyStep(state.board, from, step.to, step.captured);
}

const initialState = {
  board: createInitialBoard(),
  turn: "white",
  selectedFrom: null,
  selectedMoves: [],
  pendingSequences: [],
  status: "playing",
  winner: null,
};

const turkishDraughtsSlice = createSlice({
  name: "turkishDraughts",
  initialState,
  reducers: {
    selectSquare: (state, action) => {
      if (state.status !== "playing") return;

      const { row, col } = action.payload;

      if (state.pendingSequences.length) {
        const continuations = state.pendingSequences.filter((sequence) => (
          sequence.length && sequence[0].to.row === row && sequence[0].to.col === col
        ));

        if (!continuations.length) return;

        const from = state.selectedFrom;
        const step = continuations[0][0];
        applyCaptureStep(state, from, step);
        const remainingSequences = continuations.map((sequence) => sequence.slice(1));
        const hasMoreCaptures = remainingSequences.some((sequence) => sequence.length > 0);

        if (hasMoreCaptures) {
          state.selectedFrom = step.to;
          state.selectedMoves = [];
          state.pendingSequences = remainingSequences.filter((sequence) => sequence.length > 0);
        } else {
          finishTurn(state, state.turn, step.to);
        }
        return;
      }

      if (state.selectedFrom) {
        const matchingMoves = state.selectedMoves.filter((move) => {
          const target = move.sequence[0]?.to;
          return target && target.row === row && target.col === col;
        });

        if (matchingMoves.length) {
          const from = state.selectedFrom;
          const move = matchingMoves[0];

          if (move.sequence[0].captured) {
            applyCaptureStep(state, from, move.sequence[0]);
            const remainingSequences = matchingMoves.map((candidate) => candidate.sequence.slice(1));
            const hasMoreCaptures = remainingSequences.some((sequence) => sequence.length > 0);

            if (hasMoreCaptures) {
              state.selectedFrom = move.sequence[0].to;
              state.selectedMoves = [];
              state.pendingSequences = remainingSequences.filter((sequence) => sequence.length > 0);
            } else {
              finishTurn(state, state.turn, move.sequence[0].to);
            }
          } else {
            state.board = copyAndApplyStep(state.board, from, move.sequence[0].to, null);
            finishTurn(state, state.turn, move.sequence[0].to);
          }
          return;
        }
      }

      if (getOwner(state.board[row][col]) !== state.turn) {
        clearSelection(state);
        return;
      }

      const legalMoves = getLegalMoves(state.board, state.turn);
      const pieceMoves = legalMoves.filter((move) => move.from.row === row && move.from.col === col);

      state.selectedFrom = pieceMoves.length ? { row, col } : null;
      state.selectedMoves = pieceMoves;
    },
    restartGame: () => ({ ...initialState, board: createInitialBoard() }),
  },
});

export const { restartGame, selectSquare } = turkishDraughtsSlice.actions;
export default turkishDraughtsSlice.reducer;