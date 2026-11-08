import { createSlice } from "@reduxjs/toolkit";

export const TYPING_DURATION = 60;

export const WORD_BANK = [
  "zaman", "insan", "dünya", "hayat", "şehir", "kitap", "kalem", "bilgi", "doğa", "güneş",
  "deniz", "orman", "yolculuk", "hikâye", "müzik", "renk", "gökyüzü", "rüzgâr", "yağmur", "toprak",
  "bahçe", "pencere", "sokak", "köprü", "tren", "uçak", "bisiklet", "arkadaş", "aile", "çocuk",
  "öğrenci", "öğretmen", "merak", "düşünce", "hayal", "umut", "başarı", "çalışma", "emek", "mutluluk",
  "özgürlük", "gelecek", "geçmiş", "şimdi", "sabah", "akşam", "hafta", "mevsim", "ilkbahar", "sonbahar",
  "kahvaltı", "yemek", "sohbet", "gülümseme", "yardım", "paylaşım", "öykü", "cümle", "sözcük", "anlam",
  "soru", "yanıt", "örnek", "çözüm", "seçenek", "dikkat", "denge", "hareket", "enerji", "sağlık",
  "spor", "yürüyüş", "koşu", "dinlenme", "uyku", "başlangıç", "değişim", "gelişim", "deneyim", "fırsat",
  "plan", "program", "proje", "tasarım", "renkli", "sade", "hızlı", "yavaş", "kolay", "zor",
  "doğru", "yanlış", "güzel", "önemli", "farklı", "birlikte", "özellikle", "genellikle", "bazen", "herkes",
  "bazıları", "çünkü", "ancak", "oysa", "üstelik", "örneğin", "sonunda", "aslında", "belki", "elbette",
  "merdiven", "istasyon", "kütüphane", "üniversite", "bilgisayar", "ekran", "klavye", "uygulama", "internet", "iletişim",
  "araştırma", "keşfetmek", "öğrenmek", "anlatmak", "dinlemek", "anlamak", "hatırlamak", "denemek", "üretmek", "düşünmek",
  "mühendis", "sanatçı", "yazar", "doktor", "mimar", "muhabir", "yönetici", "gönüllü", "komşu", "misafir",
  "pazar", "market", "fırın", "lokanta", "meydan", "sahil", "liman", "vapur", "otobüs", "durak",
  "bilet", "valiz", "harita", "adres", "mahalle", "cadde", "bulvar", "apartman", "çatı", "balkon",
  "yaprak", "çiçek", "kelebek", "kuşlar", "kedi", "köpek", "kaplumbağa", "doğal", "temiz", "sessiz",
  "aydınlık", "karanlık", "serin", "ılık", "sıcak", "soğuk", "bulut", "fırtına", "dalgalar", "kıyı",
  "gölgeler", "ışıklar", "yıldız", "gezegen", "uzay", "bilim", "teknoloji", "matematik", "tarih", "coğrafya",
  "dilbilgisi", "şiir", "tiyatro", "sinema", "sergi", "konser", "fotoğraf", "resim", "heykel", "müze",
  "alışkanlık", "karar", "seçim", "sorumluluk", "özveri", "sabır", "cesaret", "nezaket", "saygı", "güven",
];

export const WORD_BANKS = {
  tr: WORD_BANK,
  en: [
    "time", "people", "world", "life", "city", "book", "pencil", "knowledge", "nature", "sunlight",
    "ocean", "forest", "journey", "story", "music", "color", "sky", "wind", "rain", "earth",
    "garden", "window", "street", "bridge", "train", "plane", "bicycle", "friend", "family", "child",
    "student", "teacher", "curiosity", "thought", "dream", "hope", "success", "practice", "effort", "happiness",
    "freedom", "future", "history", "present", "morning", "evening", "week", "season", "spring", "autumn",
    "breakfast", "dinner", "conversation", "smile", "support", "sharing", "poem", "sentence", "word", "meaning",
    "question", "answer", "example", "solution", "choice", "focus", "balance", "movement", "energy", "health",
    "exercise", "walking", "running", "rest", "sleep", "beginning", "change", "growth", "experience", "chance",
    "plan", "schedule", "project", "design", "simple", "quick", "slow", "easy", "difficult", "correct",
    "mistake", "beautiful", "important", "different", "together", "usually", "sometimes", "everyone", "because", "however",
    "perhaps", "certainly", "staircase", "station", "library", "university", "computer", "screen", "keyboard", "application",
    "internet", "communication", "research", "discover", "learn", "explain", "listen", "understand", "remember", "create",
    "engineer", "artist", "writer", "doctor", "architect", "reporter", "neighbor", "visitor", "market", "bakery",
    "restaurant", "square", "coast", "harbor", "ferry", "bus", "ticket", "suitcase", "map", "address",
    "neighborhood", "avenue", "building", "rooftop", "balcony", "leaf", "flower", "butterfly", "bird", "quiet",
    "bright", "darkness", "cool", "warm", "cloud", "storm", "wave", "shore", "shadow", "starlight",
    "planet", "space", "science", "technology", "mathematics", "geography", "grammar", "theater", "cinema", "concert",
    "photograph", "painting", "sculpture", "museum", "habit", "decision", "responsibility", "patience", "courage", "respect",
  ],
};

export function shuffleWords(words) {
  const shuffled = [...words];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

const initialState = {
  words: shuffleWords(WORD_BANK),
  language: "tr",
  typedText: "",
  timeLeft: TYPING_DURATION,
  status: "ready",
};

const typingSpeedSlice = createSlice({
  name: "typingSpeed",
  initialState,
  reducers: {
    selectTestLanguage: (state, action) => {
      state.language = action.payload.language;
      state.words = action.payload.words;
      state.typedText = "";
      state.timeLeft = TYPING_DURATION;
      state.status = "ready";
    },
    updateTypedText: (state, action) => {
      if (state.status === "finished") {
        return;
      }

      state.typedText = action.payload;
      if (state.status === "ready" && action.payload.length > 0) {
        state.status = "running";
      }
    },
    tick: (state) => {
      if (state.status !== "running") {
        return;
      }

      state.timeLeft = Math.max(0, state.timeLeft - 1);
      if (state.timeLeft === 0) {
        state.status = "finished";
      }
    },
    restartTypingTest: (state, action) => {
      state.words = action.payload;
      state.typedText = "";
      state.timeLeft = TYPING_DURATION;
      state.status = "ready";
    },
  },
});

export const {
  restartTypingTest,
  selectTestLanguage,
  tick,
  updateTypedText,
} = typingSpeedSlice.actions;
export default typingSpeedSlice.reducer;