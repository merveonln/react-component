import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchParagraphs,
  setParagraphCount,
  setParagraphFormat,
} from "../../../redux/textGeneratorSlice";
import "./TextGenerator.css";

function renderTextParagraphs(content) {
  return content
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>);
}

export default function TextGenerator() {
  const dispatch = useDispatch();
  const { count, format, content, status, error, notice } = useSelector((state) => state.textGenerator);

  useEffect(() => {
    const request = dispatch(fetchParagraphs({ count, format }));
    return () => request.abort();
  }, [count, dispatch, format]);

  const handleCountChange = (event) => {
    dispatch(setParagraphCount(event.target.value));
  };

  const handleFormatChange = (event) => {
    dispatch(setParagraphFormat(event.target.value));
  };

  return (
    <main className="text-generator-page">
      <section className="text-generator" aria-labelledby="text-generator-title">
        <h1 id="text-generator-title">React sample text generator app</h1>

        <div className="text-generator-divider" />

        <div className="text-generator-controls">
          <label className="text-generator-field" htmlFor="paragraph-count">
            <span>Paragraphs</span>
            <input
              id="paragraph-count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={handleCountChange}
            />
          </label>

          <label className="text-generator-field" htmlFor="paragraph-format">
            <span>Include HTML</span>
            <select id="paragraph-format" value={format} onChange={handleFormatChange}>
              <option value="text">No</option>
              <option value="html">Yes</option>
            </select>
          </label>
        </div>

        <div className="text-generator-output" aria-live="polite" aria-busy={status === "loading"}>
          {status === "loading" && <p className="text-generator-message">Paragraflar yükleniyor...</p>}
          {status === "failed" && <p className="text-generator-error" role="alert">{error}</p>}
          {(status === "succeeded" || status === "loading") && format === "text" && renderTextParagraphs(content)}
          {(status === "succeeded" || status === "loading") && format === "html" && (
            <pre className="generated-html" aria-label="HTML ciktisi">{content}</pre>
          )}
        </div>
        {notice && <p className="text-generator-notice" role="status">{notice}</p>}
      </section>
    </main>
  );
}