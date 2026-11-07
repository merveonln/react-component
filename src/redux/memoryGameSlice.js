import { createSlice } from "@reduxjs/toolkit";

const symbols = ["👻", "👹", "🎃", "🕷️", "🦇", "🧙", "🧛", "🧟", "🍬", "🕸️", "🧡", "🌙"];

function shuffle(cards) {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function createInitialState() {
  const cards = symbols.flatMap((symbol, pairIndex) => [
    { id: `${pairIndex}-a`, symbol, isFaceUp: false, isMatched: false },
    { id: `${pairIndex}-b`, symbol, isFaceUp: false, isMatched: false },
  ]);

  cards.push({ id: "wild-card", symbol: "🃏", isFaceUp: false, isMatched: false, isWild: true });

  return {
    cards: shuffle(cards),
    openCardIds: [],
    score: 0,
    mismatchPending: false,
    isComplete: false,
  };
}

const memoryGameSlice = createSlice({
  name: "memoryGame",
  initialState: createInitialState(),
  reducers: {
    flipCard: (state, action) => {
      const card = state.cards.find((item) => item.id === action.payload);

      if (
        !card ||
        card.isEmpty ||
        card.isFaceUp ||
        card.isMatched ||
        state.mismatchPending ||
        state.openCardIds.length === 2
      ) {
        return;
      }

      card.isFaceUp = true;

      if (state.openCardIds.length === 0) {
        state.openCardIds = [card.id];
        return;
      }

      const firstCard = state.cards.find((item) => item.id === state.openCardIds[0]);
      state.openCardIds.push(card.id);

      if (firstCard.symbol === card.symbol || firstCard.isWild || card.isWild) {
        const matchedSymbol = firstCard.isWild ? card.symbol : firstCard.symbol;

        state.cards.forEach((item) => {
          if (item.id === firstCard.id || item.id === card.id || item.symbol === matchedSymbol) {
            item.isMatched = true;
          }
        });
        state.openCardIds = [];
        state.score += 50;
        state.isComplete = state.cards.every((item) => item.isMatched);
      } else {
        state.score -= 10;
        state.mismatchPending = true;
      }
    },
    hideMismatchedCards: (state) => {
      if (!state.mismatchPending) {
        return;
      }

      state.cards.forEach((card) => {
        if (state.openCardIds.includes(card.id)) {
          card.isFaceUp = false;
        }
      });
      state.openCardIds = [];
      state.mismatchPending = false;
    },
    restartGame: () => createInitialState(),
  },
});

export const { flipCard, hideMismatchedCards, restartGame } = memoryGameSlice.actions;
export default memoryGameSlice.reducer;