import React, { useMemo, useState } from "react";
import emojiList from "./emojiList";
import "./EmojiSearchApp.css";

function normalize(text) {
  return text.toLowerCase().trim();
}

export default function EmojiSearchApp() {
  const [query, setQuery] = useState("");

  const filteredEmojis = useMemo(() => {
    const q = normalize(query);

    if (!q) {
      return emojiList;
    }

    return emojiList.filter((emoji) => {
      const title = normalize(emoji.title);
      const keywords = normalize(emoji.keywords);

      return title.includes(q) || keywords.includes(q);
    });
  }, [query]);

  const handleCopy = async (symbol) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(symbol);
      return;
    }

    const tempInput = document.createElement("textarea");
    tempInput.value = symbol;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  return (
    <section aria-label="Emoji Search App" className="emoji-page">
      <div className="emoji-shell">
      <h1 className="emoji-title">
        <span aria-hidden="true">😺</span> Emoji Search <span aria-hidden="true">😺</span>
      </h1>

      <label htmlFor="emoji-search-input" className="sr-only">
        Emoji Search Input
      </label>
      <input
        className="emoji-search-input"
        id="emoji-search-input"
        type="text"
        placeholder="Search emoji"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <ul aria-label="emoji-list" className="emoji-list">
        {filteredEmojis.map((emoji) => (
          <li key={emoji.title} className="emoji-item">
            <button
              type="button"
              onClick={() => handleCopy(emoji.symbol)}
              aria-label={`copy-${emoji.title}`}
              className="emoji-button"
            >
              <span className="emoji-symbol">{emoji.symbol}</span>
              <span className="emoji-name">{emoji.title}</span>
              <span className="emoji-copy-hint">Click to copy emoji</span>
            </button>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}