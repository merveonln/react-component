import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flipCard, hideMismatchedCards, restartGame } from "../../../redux/memoryGameSlice";
import "./MemoryGame.css";

export default function MemoryGame() {
  const dispatch = useDispatch();
  const { cards, score, mismatchPending, isComplete } = useSelector((state) => state.memoryGame);

  useEffect(() => {
    if (!mismatchPending) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(hideMismatchedCards());
    }, 850);

    return () => window.clearTimeout(timeoutId);
  }, [dispatch, mismatchPending]);

  return (
    <main className="memory-game-page">
      <section className="memory-game" aria-labelledby="memory-game-title">
        <header className="memory-game-header">
          <div>
            <p className="memory-game-eyebrow">KARTLARI EŞLEŞTİR</p>
            <h1 id="memory-game-title">Hafiza Oyunu</h1>
            <p className="memory-game-instructions">
              Aynı sembolleri bul. Her doğru eşleşme 50 puan kazandırır.
            </p>
          </div>
          <div className="memory-game-score" aria-live="polite">
            <span>Puan</span>
            <strong>{score}</strong>
          </div>
        </header>

        <div className="memory-game-board" role="group" aria-label="5'e 5 hafıza kartları">
          {cards.map((card, index) => {
            const isRevealed = card.isFaceUp || card.isMatched;

            return (
              <button
                key={card.id}
                type="button"
                className={`memory-card ${isRevealed ? "is-revealed" : ""} ${card.isMatched ? "is-matched" : ""}`}
                onClick={() => dispatch(flipCard(card.id))}
                disabled={card.isMatched || mismatchPending || isComplete}
                aria-label={isRevealed ? `Kart ${index + 1}: ${card.symbol}` : `Kapalı kart ${index + 1}`}
                aria-pressed={isRevealed}
              >
                <span className="memory-card-face memory-card-back" aria-hidden="true">?</span>
                <span className="memory-card-face memory-card-front" aria-hidden="true">{card.symbol}</span>
              </button>
            );
          })}
        </div>

        {isComplete ? (
          <div className="memory-game-complete" role="status">
            <div>
              <strong>Tebrikler, tüm çiftleri buldun!</strong>
              <span>Toplam puanın: {score}</span>
            </div>
            <button type="button" className="memory-restart-button" onClick={() => dispatch(restartGame())}>
              Yeniden Oyna
            </button>
          </div>
        ) : (
          <p className="memory-game-hint" aria-live="polite">
            {mismatchPending ? "Kartlar eşleşmedi, tekrar kapanacak..." : "Kartları açarak eşleri bul."}
          </p>
        )}
      </section>
    </main>
  );
}