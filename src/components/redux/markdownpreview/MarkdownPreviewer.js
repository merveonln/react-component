import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CircleHelp, X } from "lucide-react";
import "./MarkdownPreviewer.css";

const codeTick = String.fromCharCode(96);
const exampleMarkdown = [
  "# Heading",
  "",
  "## Sub-heading",
  "",
  "### Another deeper heading",
  "",
  "Paragraphs are separated by a blank line.",
  "",
  "Leave two spaces at the end of a line to do a  ",
  "line break.",
  "",
  `Text attributes *italic*, **bold**, ${codeTick}monospace${codeTick}, ~~strikethrough~~.`,
  "",
  "Shopping list:",
  "",
  "- apples",
  "- oranges",
  "- pears",
  "",
  "Numbered list:",
  "",
  "1. apples",
  "2. oranges",
  "3. pears",
  "",
  "The rain--not the reign--in Spain.",
  "",
  "[Markdown Guide](https://www.markdownguide.org/)",
].join("\n");

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(exampleMarkdown);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    if (!isHelpOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsHelpOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHelpOpen]);

  return (
    <main className="markdown-page">
      <section className="markdown-app" aria-labelledby="markdown-title">
        <header className="markdown-header">
          <div>
            <p className="markdown-kicker">WRITE · PREVIEW</p>
            <h1 id="markdown-title">Markdown Previewer</h1>
          </div>
          <button
            type="button"
            className="markdown-help-button"
            aria-label="Örnek Markdown ve ön izlemesini göster"
            aria-expanded={isHelpOpen}
            onClick={() => setIsHelpOpen(true)}
          >
            <CircleHelp size={25} aria-hidden="true" />
          </button>
        </header>

        <div className="markdown-workspace">
          <section className="markdown-pane" aria-labelledby="markdown-editor-title">
            <div className="markdown-pane-heading">
              <h2 id="markdown-editor-title">Markdown</h2>
              <span>EDITÖR</span>
            </div>
            <textarea
              className="markdown-editor"
              aria-label="Markdown metni"
              spellCheck="false"
              value={markdown}
              onChange={(event) => setMarkdown(event.target.value)}
            />
          </section>

          <section className="markdown-pane markdown-preview-pane" aria-labelledby="markdown-preview-title">
            <div className="markdown-pane-heading">
              <h2 id="markdown-preview-title">Ön izleme</h2>
              <span>CANLI</span>
            </div>
            <article className="markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </article>
          </section>
        </div>
      </section>

      {isHelpOpen && (
        <div
          className="markdown-dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsHelpOpen(false);
            }
          }}
        >
          <section
            className="markdown-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="markdown-dialog-title"
          >
            <header className="markdown-dialog-header">
              <div>
                <p className="markdown-kicker">QUICK REFERENCE</p>
                <h2 id="markdown-dialog-title">Markdown örneği</h2>
              </div>
              <button
                type="button"
                className="markdown-close-button"
                aria-label="Örnek penceresini kapat"
                onClick={() => setIsHelpOpen(false)}
              >
                <X size={21} aria-hidden="true" />
              </button>
            </header>
            <div className="markdown-example-grid">
              <pre className="markdown-example-source">{exampleMarkdown}</pre>
              <article className="markdown-example-preview">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{exampleMarkdown}</ReactMarkdown>
              </article>
            </div>
            <button
              type="button"
              className="markdown-load-example"
              onClick={() => {
                setMarkdown(exampleMarkdown);
                setIsHelpOpen(false);
              }}
            >
              Örneği editöre yükle
            </button>
          </section>
        </div>
      )}
    </main>
  );
}