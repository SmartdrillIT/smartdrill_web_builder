"use client";

import { useState, useRef, useEffect } from "react";
import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import { CHAT_API_URL } from "@/lib/config";
import { useLanguage } from "@/context/LanguageContext";

// Semilla estable: el mismo texto siempre genera la misma cara.
// "sd-soporte" verificado: celeste pálido con ojos alargados, como blobatar.dev.
const ASSISTANT_SEED = "sd-soporte";

export default function ChatWidget() {
  const { t } = useLanguage();
  const chat = t("chat");
  const mascot = t("mascot");
  // Ojos que siguen el cursor (solo afecta al avatar con animate).
  const { ref } = useGaze({ travel: 3, lookAt: "pointer" });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: chat.greeting, isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsTyping(true);

    const conversationHistory = messages.map(msg => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text
    }));

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: conversationHistory }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.error) {
        setMessages(prev => [...prev, { text: data.error, isBot: true }]);
      } else if (data.reply) {
        setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
      } else {
        setMessages(prev => [...prev, { text: chat.empty, isBot: true }]);
      }
    } catch (error) {
      setIsTyping(false);
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { text: chat.error, isBot: true }]);
    }
  };

  return (
    /* Contenedor principal: Elevado a 6.5625rem en móviles para no tapar el buscador */
    <div className="fixed bottom-[6.5625rem] md:bottom-10 right-4 md:right-8 z-[110] flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Chat Window */}
      {isOpen && (
        <div id="smartdrill-chat" role="dialog" aria-label="Asistente Smart Drill" className="pointer-events-auto bg-white/95 backdrop-blur-[30px] rounded-[2rem] shadow-[0_25px_80px_rgba(0,0,0,0.15)] w-[calc(100vw-2rem)] max-w-[21.25rem] h-[min(28.125rem,70vh)] flex flex-col overflow-hidden border border-zinc-200 origin-bottom-right transition-all">
          
          {/* Header */}
          <div className="border-b border-zinc-100 p-4 flex justify-between items-center bg-zinc-50">
            <div className="flex items-center gap-3">
              <Blobatar
                name={ASSISTANT_SEED}
                size={32}
                animate="hover"
                title={chat.name}
              />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                <span className="font-bold text-sm text-zinc-900 tracking-wide">{chat.name}</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label={chat.close} className="text-zinc-500 hover:text-zinc-900 transition-colors p-1">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.isBot ? "justify-start" : "justify-end"}`}>
                {msg.isBot && (
                  <Blobatar
                    name={ASSISTANT_SEED}
                    size={24}
                    title={chat.name}
                    className="shrink-0"
                  />
                )}
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[0.84375rem] leading-relaxed shadow-sm break-words ${
                  msg.isBot
                    ? "bg-zinc-100 border border-zinc-200/70 text-zinc-800 rounded-tl-sm"
                    : "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-tr-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 border border-zinc-200 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5 items-center h-2">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-zinc-100 bg-zinc-50">
            <div className="flex gap-2 bg-white p-1.5 rounded-[1.5rem] border border-zinc-200 focus-within:border-orange-500/30 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={chat.placeholder}
                aria-label={chat.placeholder}
                className="flex-1 min-w-0 px-3 py-2 bg-transparent text-[0.875rem] text-zinc-900 focus:outline-none placeholder:text-zinc-400"
              />
              <button
                onClick={handleSend}
                aria-label={chat.send}
                className="bg-orange-600 text-white p-2.5 rounded-full hover:bg-orange-500 transition-colors flex items-center justify-center disabled:opacity-50"
                disabled={!input.trim()}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launcher: burbuja + botón con la mascota, abajo a la derecha */}
      <div className="pointer-events-auto flex items-end gap-3">
        {!isOpen && (
          <div className="mb-1 rounded-2xl bg-white px-4 py-2 shadow-lg ring-1 ring-black/5">
            <p className="text-sm font-semibold text-zinc-900">{mascot.name}</p>
            <p className="text-sm text-zinc-500">{mascot.role}</p>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? chat.close : chat.open}
          aria-expanded={isOpen}
          aria-controls="smartdrill-chat"
          className="bg-white border border-zinc-200 text-zinc-700 h-16 w-16 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.15)] grid place-items-center hover:bg-zinc-100 hover:border-orange-500/50 hover:text-orange-600 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {isOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <Blobatar
              ref={ref}
              name={ASSISTANT_SEED}
              size={52}
              animate="always"
              title={chat.open}
            />
          )}
        </button>
      </div>
    </div>
  );
}