import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const localParagraphs = [
  "A quiet morning began with sunlight moving across the room. A warm cup of coffee and a few minutes of calm made the day feel full of possibility.",
  "Good ideas often appear when we give ourselves time to explore. A short walk, a thoughtful conversation, or a fresh page can be enough to get started.",
  "The small details gave the old street its character: bright windows, leafy balconies, and the sound of people greeting one another along the way.",
  "Learning something new takes patience. Each attempt adds a little more understanding, and progress becomes easier to notice when we keep going.",
];

function buildLocalContent(count, format) {
  const paragraphs = Array.from({ length: count }, (_, index) => localParagraphs[index % localParagraphs.length]);

  return format === "html"
    ? paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("\n")
    : paragraphs.join("\n\n");
}

export const fetchParagraphs = createAsyncThunk(
  "textGenerator/fetchParagraphs",
  async ({ count, format }, { signal }) => {
    const params = new URLSearchParams({
      type: "all-meat",
      paras: String(count),
      format,
    });
    const requestController = new AbortController();
    const abortRequest = () => requestController.abort();
    const timeoutId = setTimeout(abortRequest, 12000);
    signal.addEventListener("abort", abortRequest, { once: true });

    try {
      const response = await fetch(`https://baconipsum.com/api/?${params}`, {
        signal: requestController.signal,
      });

      if (!response.ok) {
        throw new Error(`Paragraph API returned ${response.status}`);
      }

      return {
        content: await response.text(),
        isFallback: false,
      };
    } catch (error) {
      if (signal.aborted) {
        throw error;
      }

      return {
        content: buildLocalContent(count, format),
        isFallback: true,
      };
    } finally {
      clearTimeout(timeoutId);
      signal.removeEventListener("abort", abortRequest);
    }
  }
);

const initialState = {
  count: 4,
  format: "text",
  content: buildLocalContent(4, "text"),
  status: "loading",
  error: "",
  notice: "",
  currentRequestId: undefined,
};

const textGeneratorSlice = createSlice({
  name: "textGenerator",
  initialState,
  reducers: {
    setParagraphCount: (state, action) => {
      state.count = Math.max(1, Math.min(100, Math.floor(Number(action.payload) || 1)));
      state.content = buildLocalContent(state.count, state.format);
      state.status = "loading";
      state.error = "";
      state.notice = "";
    },
    setParagraphFormat: (state, action) => {
      state.format = action.payload === "html" ? "html" : "text";
      state.content = buildLocalContent(state.count, state.format);
      state.status = "loading";
      state.error = "";
      state.notice = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParagraphs.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
        state.notice = "";
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchParagraphs.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.status = "succeeded";
        state.content = action.payload.content;
        state.error = "";
        state.notice = action.payload.isFallback
          ? "örnek metin yerel olarak gÖsteriliyor; API ŞU anda yanIT vermiyor."
          : "";
        state.currentRequestId = undefined;
      })
      .addCase(fetchParagraphs.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        if (action.meta.aborted) {
          state.status = state.content ? "succeeded" : "idle";
          state.currentRequestId = undefined;
          return;
        }

        state.status = "failed";
        state.error = "Paragraflar yÜklenemedi.";
        state.notice = "Paragraflar yÜklenemedi.";
        state.currentRequestId = undefined;
      });
  },
});

export const { setParagraphCount, setParagraphFormat } = textGeneratorSlice.actions;
export default textGeneratorSlice.reducer;