import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotateCcw } from "lucide-react";
import { getLegalMoves, restartGame, selectSquare } from "../../../redux/turkishDraughtsSlice";
import "./TurkishDraughts.css";

const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

function getPieceOwner(piece) {
  if (!piece) return "";
  return piece.toLowerCase() === "w" ? "white" : "black";
}

export default function TurkishDraughts() {
  const dispatch = useDispatch();
  const { board, turn, selectedFrom, selectedMoves, pendingSequences, status, winner } = useSelector(
    (state) => state.turkishDraughts
  );

  const targets = pendingSequences.length
    ? pendingSequences.map((sequence) => sequence[0]).filter(Boolean)
    : selectedMoves.map((move) => move.sequence[0]).filter(Boolean);
  const targetMap = new Map(targets.map((step) => [`${step.to.row}-${step.to.col}`, step]));
  const legalMoves = status === "playing" ? getLegalMoves(board, turn) : [];
  const captureRequired = pendingSequences.length > 0 || legalMoves.some((move) => move.sequence[0]?.captured);
  const movablePieces = new Set(
    pendingSequences.length
      ? [`${selectedFrom?.row}-${selectedFrom?.col}`]
      : legalMoves.map((move) => `${move.from.row}-${move.from.col}`)
  );
  const whitePieces = board.flat().filter((piece) => getPieceOwner(piece) === "white").length;
  const blackPieces = board.flat().filter((piece) => getPieceOwner(piece) === "black").length;

  let gameMessage = turn === "white" ? "Sıra Beyaz taşlarda" : "Sıra Siyah taşlarda";
  if (status === "won") {
    gameMessage = winner === "white" ? "Beyaz kazandı" : "Siyah kazandı";
  } else if (status === "draw") {
    gameMessage = "Oyun berabere: gayyım";
  } else if (pendingSequences.length) {
    gameMessage = turn === "white" ? "Beyaz: alma zincirini tamamla" : "Siyah: alma zincirini tamamla";
  } else if (captureRequired) {
    gameMessage = turn === "white" ? "Beyaz: taş alma zorunlu" : "Siyah: taş alma zorunlu";
  }

  const handleRestart = () => dispatch(restartGame());

  return (
    <main className="turkish-draughts-page">
      <div className="turkish-draughts-shell">
        <header className="draughts-header">
          <div>
            <p className="draughts-kicker">İKİ KİŞİ · AYNI CİHAZ</p>
            <h1>Türk Daması</h1>
            <p className="draughts-subtitle">Düz ilerle, doğru anı bekle, damaya ulaş.</p>
          </div>
          <button type="button" className="draughts-restart" onClick={handleRestart}>
            <RotateCcw size={17} aria-hidden="true" /> <span>Yeni oyun</span>
          </button>
        </header>

        <section className="draughts-game-layout" aria-label="Türk Daması oyunu">
          <div className="draughts-board-column">
            <div className="draughts-board" role="grid" aria-label="8'e 8 Türk Daması tahtası">
              <span className="draughts-axis-corner" aria-hidden="true" />
              {columns.map((column) => <span className="draughts-axis-letter" key={`top-${column}`}>{column}</span>)}
              {board.map((row, rowIndex) => (
                <React.Fragment key={`row-${rowIndex}`}>
                  <span className="draughts-axis-number">{8 - rowIndex}</span>
                  {row.map((piece, colIndex) => {
                    const coordinate = `${rowIndex}-${colIndex}`;
                    const target = targetMap.get(coordinate);
                    const selected = selectedFrom?.row === rowIndex && selectedFrom?.col === colIndex;
                    const movable = movablePieces.has(coordinate);
                    const owner = getPieceOwner(piece);
                    const king = piece === "W" || piece === "B";
                    const tone = (rowIndex + colIndex) % 2 ? "dark" : "light";

                    return (
                      <button
                        key={coordinate}
                        type="button"
                        role="gridcell"
                        className={`draughts-square ${tone} ${selected ? "selected" : ""} ${movable ? "movable-source" : ""} ${target ? "legal-target" : ""} ${target?.captured ? "capture-target" : ""}`}
                        onClick={() => dispatch(selectSquare({ row: rowIndex, col: colIndex }))}
                        disabled={status !== "playing"}
                        title={movable ? (captureRequired ? "Zorunlu alma: bu taşı seç" : "Bu taşı hareket ettirebilirsin") : undefined}
                        aria-label={`${columns[colIndex]}${8 - rowIndex}${piece ? ` ${owner === "white" ? "beyaz" : "siyah"} taşı${king ? ", dama" : ""}` : " boş"}`}
                      >
                        {piece && <span className={`draughts-piece ${owner} ${king ? "king" : ""}`} aria-hidden="true">{king ? "D" : ""}</span>}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          <aside className="draughts-sidebar">
            <div className={`draughts-turn-card ${status}`} aria-live="polite">
              <span className="draughts-turn-label">OYUN DURUMU</span>
              <div className="draughts-turn-indicator">
                <span className={`turn-disc ${status === "won" ? winner : turn}`} />
                <strong>{gameMessage}</strong>
              </div>
              <p>{status !== "playing"
                ? "Yeni oyun başlatarak tekrar oynayabilirsin."
                : pendingSequences.length
                  ? "Alma zinciri bitene kadar aynı taşla devam et."
                  : captureRequired
                    ? "Vurgulanan taşla rakip taşı almak zorundasın."
                    : `${turn === "white" ? "Beyaz" : "Siyah"} oynuyor. Vurgulanan taşlardan birini seç.`}</p>
            </div>

            <div className="draughts-score-card">
              <h2>Taşlar</h2>
              <div className="draughts-score-row"><span><i className="score-disc white" /> Beyaz</span><strong>{whitePieces}</strong></div>
              <div className="draughts-score-row"><span><i className="score-disc black" /> Siyah</span><strong>{blackPieces}</strong></div>
            </div>

            <details className="draughts-rules">
              <summary>Nasıl oynanır?</summary>
              <ul>
                <li>Yoz taşlar ileri veya sağa-sola bir kare gider; geri ve çapraz gidemez.</li>
                <li>Alma zorunludur; seçenek varsa en çok taşı alan zincir seçilir.</li>
                <li>Son sıraya ulaşan taş dama olur ve düz hat üzerinde ilerler.</li>
                <li>Rakibin taşı veya yasal hamlesi kalmadığında kazanırsın.</li>
              </ul>
            </details>

            <button type="button" className="draughts-sidebar-restart" onClick={handleRestart}>
              <RotateCcw size={16} aria-hidden="true" /> Yeni oyuna başla
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}