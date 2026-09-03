import { useState } from "react";
import { API_URL } from "../config";

const STARTER = {
  role: "bot",
  text: "hey! i'm the Heaver Wear stylist bot 👾 tell me whatchu want",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([STARTER]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);

  function send(e) {
    e.preventDefault();
    if (!draft.trim() || thinking) return;

    const userMsg = { role: "user", text: draft };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setDraft("");
    setThinking(true);

    fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    })
      .then((res) => res.json())
      .then((data) => {
        const replyText = data.reply || "hmm, something went wrong on my end.";
        setMessages((prev) => [...prev, { role: "bot", text: replyText }]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "couldn't reach the server — is the backend running?" },
        ]);
      })
      .finally(() => {
        setThinking(false);
      });
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-80 max-w-[90vw] rounded-2xl border-2 border-ink-soft bg-ink flex flex-col overflow-hidden shadow-[4px_4px_0_0_#0a0a12]">
          <div className="bg-uv px-4 py-3 flex items-center justify-between">
            <span className="font-display text-[11px] text-paper">
              AI STYLIST
            </span>
            <button
              onClick={() => setOpen(false)}
              className="font-mono text-paper/80 hover:text-paper text-sm"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 max-h-72 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.map((m, i) => (
              <p
                key={i}
                className={`font-body text-sm rounded-xl px-3 py-2 max-w-[85%] ${
                  m.role === "bot"
                    ? "bg-ink-soft text-paper/90 self-start"
                    : "bg-flare text-ink self-end"
                }`}
              >
                {m.text}
              </p>
            ))}
            {thinking && (
              <p className="font-body text-sm text-paper/40 self-start px-3">
                typing…
              </p>
            )}
          </div>

          <form onSubmit={send} className="flex border-t-2 border-ink-soft">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about fits, sizing…"
              className="flex-1 bg-transparent px-4 py-3 font-body text-sm outline-none placeholder:text-paper/30"
            />
            <button
              type="submit"
              disabled={thinking}
              className="px-4 font-mono text-xs uppercase text-volt hover:text-paper disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-flare text-ink border-2 border-ink shadow-[3px_3px_0_0_#0a0a12] font-display text-lg hover:-translate-y-0.5 transition-all"
        aria-label="Toggle AI stylist chat"
      >
        {open ? "✕" : "★"}
      </button>
    </div>
  );
}