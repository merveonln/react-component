import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlarmClock, RotateCcw, Target, Zap } from "lucide-react";
import {
  restartTypingTest,
  selectTestLanguage,
  shuffleWords,
  tick,
  updateTypedText,
  WORD_BANKS,
} from "../../../redux/typingSpeedSlice";
import "./TypingSpeedApp.css";

function getCompletedWordCount(text) {
  const completedText = text.match(/\S+\s/g);
  return completedText ? completedText.length : 0;
}

function getTypedTokens(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function getKeystrokeStats(text, words) {
  const expectedText = words.join(" ");
  let correctKeystrokes = 0;

  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === expectedText[index]) {
      correctKeystrokes += 1;
    }
  }

  return {
    correctKeystrokes,
    incorrectKeystrokes: text.length - correctKeystrokes,
    totalKeystrokes: text.length,
  };
}

function calculateResults(text, words) {
  const typedWords = getTypedTokens(text);
  const correctWords = typedWords.filter((word, index) => word === words[index]).length;
  const keystrokes = getKeystrokeStats(text, words);

  return {
    correctWords,
    incorrectWords: typedWords.length - correctWords,
    accuracy: keystrokes.totalKeystrokes
      ? Math.round((keystrokes.correctKeystrokes / keystrokes.totalKeystrokes) * 100)
      : 0,
    wpm: correctWords,
    ...keystrokes,
  };
}

export default function TypingSpeedApp() {
  const dispatch = useDispatch();
  const { words, language, typedText, timeLeft, status } = useSelector((state) => state.typingSpeed);
  const inputRef = useRef(null);
  const completedWordCount = getCompletedWordCount(typedText);
  const typedTokens = getTypedTokens(typedText);
  const activeWordIndex = completedWordCount;
  const results = status === "finished" ? calculateResults(typedText, words) : null;
  const liveKeystrokes = getKeystrokeStats(typedText, words);

  useEffect(() => {
    if (status !== "running") {
      return undefined;
    }

    const timerId = window.setInterval(() => dispatch(tick()), 1000);
    return () => window.clearInterval(timerId);
  }, [dispatch, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleRestart = () => {
    dispatch(restartTypingTest(shuffleWords(WORD_BANKS[language])));
    inputRef.current?.focus();
  };

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    dispatch(selectTestLanguage({
      language: nextLanguage,
      words: shuffleWords(WORD_BANKS[nextLanguage]),
    }));
    inputRef.current?.focus();
  };

  return (
    <main className="typing-page">
      <div className="typing-shell">
        <header className="typing-header">
          <div className="typing-brand">
            <span className="typing-brand-mark"><Zap size={19} fill="currentColor" /></span>
            <span>KEYSTROKE</span>
          </div>
          <div className="typing-header-actions">
            <label className="typing-language-picker" htmlFor="typing-language">
              <span>Test dili</span>
              <select id="typing-language" value={language} onChange={handleLanguageChange}>
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </label>
            <button type="button" className="typing-restart" onClick={handleRestart}>
              <RotateCcw size={17} aria-hidden="true" />
              <span>Yeniden başlat</span>
            </button>
          </div>
        </header>

        <section className="typing-intro">
          <p className="typing-eyebrow">60 SANİYELİK {language === "tr" ? "TÜRKÇE" : "İNGİLİZCE"} TEST</p>
          <h1>Kelimeler akarken,<br />ritmini bul.</h1>
          <p className="typing-description">Ekrandaki kelimeleri sırayla yaz. Süre ilk tuşunla başlar.</p>
        </section>

        <section className="typing-test" aria-label="Klavye hız testi">
          <div className="typing-test-topline">
            <div className={`typing-timer ${timeLeft <= 10 ? "is-low" : ""}`} aria-live="polite">
              <AlarmClock size={17} aria-hidden="true" />
              <span>{String(timeLeft).padStart(2, "0")}</span>
              <small>sn</small>
            </div>
            <div className="typing-status">
              {status === "ready" && "Hazır olduğunda yazmaya başla"}
              {status === "running" && "Test devam ediyor"}
              {status === "finished" && "Süre tamamlandı"}
            </div>
            <div className="typing-progress" aria-label={`${60 - timeLeft} saniye geçti`}>
              <span style={{ width: `${((60 - timeLeft) / 60) * 100}%` }} />
            </div>
          </div>
          <p className="typing-live-keystrokes" aria-live="polite">
            Tuş vuruşu <strong>{liveKeystrokes.correctKeystrokes}</strong>
            <span>|</span><em>{liveKeystrokes.incorrectKeystrokes}</em>
            <small>Toplam {liveKeystrokes.totalKeystrokes}</small>
          </p>

          <div className="typing-word-display" aria-label="Yazılacak kelimeler">
            {words.map((word, index) => {
              let wordState = "";
              if (index < completedWordCount) {
                wordState = typedTokens[index] === word ? "is-correct" : "is-incorrect";
              } else if (index === activeWordIndex && status !== "finished") {
                wordState = "is-current";
              }

              return <span className={`typing-word ${wordState}`} key={`${index}-${word}`}>{word}</span>;
            })}
          </div>

          <label className="typing-input-label" htmlFor="typing-input">Yazmaya başlamak için buraya tıkla</label>
          <textarea
            ref={inputRef}
            id="typing-input"
            className="typing-input"
            value={typedText}
            onChange={(event) => dispatch(updateTypedText(event.target.value))}
            disabled={status === "finished"}
            placeholder="Yukarıdaki kelimeleri buraya yaz..."
            spellCheck="false"
            autoCapitalize="off"
            autoCorrect="off"
            rows={2}
          />

          {status === "finished" && results && (
            <section className="typing-results" aria-live="polite" aria-labelledby="typing-results-title">
              <div className="typing-results-heading">
                <div>
                  <p className="typing-eyebrow">TEST SONUCU</p>
                  <h2 id="typing-results-title">Güzel iş, test tamamlandı.</h2>
                </div>
                <button type="button" className="typing-result-restart" onClick={handleRestart}>
                  <RotateCcw size={16} aria-hidden="true" /> Tekrar dene
                </button>
              </div>
              <div className="typing-result-grid">
                <div className="typing-result-primary"><span>Kelime / dakika</span><strong>{results.wpm}</strong></div>
                <div className="typing-result-keystrokes">
                  <span>Tuş vuruşu</span>
                  <strong>{results.totalKeystrokes}</strong>
                  <small><b>{results.correctKeystrokes}</b><i>|</i><em>{results.incorrectKeystrokes}</em></small>
                </div>
                <div><span>Doğru kelime</span><strong>{results.correctWords}</strong></div>
                <div><span>Yanlış kelime</span><strong>{results.incorrectWords}</strong></div>
                <div><span>Doğruluk</span><strong>{results.accuracy}%</strong></div>
              </div>
            </section>
          )}
        </section>

        <footer className="typing-footer">
          <span><Target size={15} aria-hidden="true" /> Boşluk tuşu bir sonraki kelimeye geçer</span>
          <span>İyi yazmalar.</span>
        </footer>
      </div>
    </main>
  );
}