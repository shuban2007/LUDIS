'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDemo } from '@/lib/demo/demo-context';

export function PhysioCopilot() {
  const { getCurrentAthlete } = useDemo();
  const currentAthlete = getCurrentAthlete();
  
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; parts: { text: string }[] }[]>([
    { role: 'model', parts: [{ text: 'Hi! I am your AI Physio Copilot. How are you feeling today?' }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user' as const, parts: [{ text: userText }] }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key not found');

      // Gemini requires the conversation history to start with a 'user' role.
      // We slice(1) to remove the initial 'model' greeting from the API payload.
      const apiMessages = newMessages.slice(1);
      
      const systemPrompt = `You are an elite sports physiotherapist and nutrition AI assistant for professional athletes. Keep responses concise, professional, and actionable. Here is the data for the current athlete you are advising:\n${JSON.stringify(currentAthlete, null, 2)}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents: apiMessages
          })
        }
      );
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'API request failed');
      
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
      setMessages(prev => [...prev, { role: 'model', parts: [{ text }] }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Sorry, I am having trouble connecting to my diagnostic engine right now.' }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl card-depth-1 p-6 flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-xs font-bold tracking-widest text-foreground uppercase">
          AI PHYSIO & NUTRITION COPILOT
        </h2>
        <div className="flex items-center gap-2 text-[10px] text-brand uppercase font-bold tracking-wider">
          {isLoading ? 'Processing...' : 'Diagnostic Engine Ready'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-surface-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand text-brand-foreground rounded-tr-sm' : 'bg-surface-2 border border-border-default text-foreground rounded-tl-sm'}`}>
                {msg.parts[0].text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="pt-4 mt-4 border-t border-border-subtle shrink-0 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your symptoms or ask a nutrition question..."
          className="flex-1 bg-surface-2 border border-border-default rounded-xl px-4 py-2 text-sm text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-brand transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-brand hover:bg-brand-hover text-brand-foreground rounded-xl px-4 py-2 font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}

