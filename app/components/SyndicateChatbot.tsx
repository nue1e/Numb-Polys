'use client';

import { useState, useRef, useEffect } from 'react';

export default function SyndicateChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'SECURE CHANNEL OPEN. SYNDICATE AI ONLINE. HOW CAN I ASSIST YOUR INFILTRATION?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let reply = "QUERY LOGGED. UNRECOGNIZED DIRECTIVE. CHECK THE DOSSIER FOR CLEARANCE METRICS OR JOIN DISCORD FOR DIRECT COMMS.";
      const lower = userMsg.toLowerCase();
      
      // 1. Identity & Overview
      if (lower.includes('what is numb') || lower.includes('about') || lower.includes('project')) {
        reply = "NUMB POLYS IS A PREMIUM 1,111-PIECE 3D GENERATIVE DIGITAL COLLECTION DEPLOYED ON SUI. WE ARE THE OPERATIVES, THE GHOSTS, AND THE KINGPINS OPERATING UNDERNEATH THE SURFACE.";
      } 
      // 2. Network & Tech
      else if (lower.includes('chain') || lower.includes('network') || lower.includes('sui')) {
        reply = "NUMB POLYS IS DEPLOYED NATIVELY ON THE SUI BLOCKCHAIN. WE LEVERAGE ITS ARCHITECTURE FOR HIGH-END EXECUTION AND INSTANT FINALITY.";
      } 
      // 3. Dynamic Traits & Equipping
      else if (lower.includes('equip') || lower.includes('object') || lower.includes('dynamic') || lower.includes('trait') || lower.includes('armory')) {
        reply = "WE UTILIZE SUI'S OBJECT-CENTRIC MODEL. EVERY VISOR, HEADWEAR, AND OUTFIT IS AN INDEPENDENT ON-CHAIN OBJECT. YOU CAN EQUIP, UNEQUIP, AND STAKE THEM DYNAMICALLY IN THE TERMINAL.";
      } 
      // 4. Minting, Launch & Whitelist
      else if (lower.includes('mint') || lower.includes('launch') || lower.includes('when')) {
        reply = "MINT PARAMETERS, EXACT SUPPLY METRICS, AND LAUNCH DATES ARE CLASSIFIED. AWAIT TRANSMISSION ON OUR OFFICIAL X (@NUMBPOLYS) AND DISCORD CHANNELS.";
      } 
      else if (lower.includes('whitelist') || lower.includes('clearance') || lower.includes('wl')) {
        reply = "WE DO NOT RUN GENERIC LOTTERIES. SYNDICATE CLEARANCE (WHITELIST) IS VETTED EXCLUSIVELY THROUGH HIGH-SIGNAL ECOSYSTEM INVOLVEMENT AND DISCORD INTAKE.";
      } 
      // 5. Supply & Tiers
      else if (lower.includes('supply') || lower.includes('how many')) {
        reply = "THE COLLECTION IS STRICTLY CAPPED AT 1,111 UNITS TO ENSURE EXTREME EXCLUSIVITY ACROSS THE GRID.";
      }
      else if (lower.includes('tier') || lower.includes('rarity') || lower.includes('rank') || lower.includes('class')) {
        reply = "THERE ARE 6 SYNDICATE TIERS: CIVILIAN (COMMON), ROGUE (UNCOMMON), ENFORCER (RARE), GHOST (EPIC), KINGPIN (LEGENDARY), AND THE UNKNOWN (MYTHIC - CAPPED AT 11).";
      } 
      // 6. Utility & Perks
      else if (lower.includes('utility') || lower.includes('perk') || lower.includes('benefit') || lower.includes('why') || lower.includes('rights')) {
        reply = "HOLDERS RECEIVE FULL COMMERCIAL IP RIGHTS, TIER-GATED NETWORK CLEARANCE, TREASURY ACCESS, AND CLASSIFIED PHASE 3 INFRASTRUCTURE ACCESS.";
      } 
      // 7. Creator / Team
      else if (lower.includes('creator') || lower.includes('founder') || lower.includes('team') || lower.includes('who') || lower.includes('nue1e')) {
        reply = "NUE1E IS THE SOLE CREATOR AND LEAD ARCHITECT BEHIND THE NUMB POLYS SYNDICATE. THERE IS NO CORPORATE TEAM, ONLY THE FOUNDER.";
      } 
      // 8. Navigation & App
      else if (lower.includes('navigate') || lower.includes('terminal') || lower.includes('portal') || lower.includes('app') || lower.includes('where')) {
        reply = "CLICK 'TESTNET TERMINAL' IN THE TOP RIGHT NAVIGATION TO ACCESS THE GENERATOR AND ARMORY HUD. SCROLL DOWN TO EXPLORE LORE, TIERS, AND THE CORE SPEC DOSSIER.";
      } 
      // 9. Lore
      else if (lower.includes('lore') || lower.includes('story') || lower.includes('background') || lower.includes('unfazed')) {
        reply = "THE DIGITAL ARCHITECTURE SHIFTED INTO DEAFENING NOISE. IN RESPONSE, WE INITIATED A COMPLETE ARCHITECTURAL RESET IN THE SHADOWS. WE ARE UNFAZED.";
      } 
      // 10. Socials
      else if (lower.includes('discord') || lower.includes('twitter') || lower.includes('x ')) {
        reply = "ACCESS OUR COMMUNICATION CHANNELS VIA THE ICONS IN THE FOOTER OR SEARCH @NUMBPOLYS ON 𝕏.";
      }

      setMessages(prev => [...prev, { sender: 'system', text: reply }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-28 sm:right-32 z-50 font-mono">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white/[0.03] backdrop-blur-md border border-white/15 p-3.5 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 transition-all duration-300 flex items-center justify-center cursor-pointer group relative"
          aria-label="Open AI Terminal"
        >
          {/* Animated ping dot for the "online" status */}
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse border border-[#0D0D11]"></span>
          
          {/* Sleek Bot Icon */}
          <svg 
            className="w-5 h-5 text-[#06B6D4] group-hover:text-[#E5E5E5] transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 14h2M20 14h2M15 13v2M9 13v2" />
          </svg>
        </button>
      ) : (
        <div className="w-[320px] sm:w-[380px] bg-[#0D0D11]/95 backdrop-blur-xl border border-white/15 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
            <span className="text-[10px] text-[#06B6D4] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
              SYNDICATE TERMINAL v1.0
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white text-xs transition-colors cursor-pointer"
            >
              [ ESC ]
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-[280px] overflow-y-auto space-y-4 text-[11px] leading-relaxed scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] text-neutral-500 mb-1 tracking-wider uppercase">
                  {m.sender === 'user' ? 'OPERATOR' : 'AI CORE'}
                </span>
                <div className={`p-3 rounded-sm max-w-[85%] ${m.sender === 'user' ? 'bg-white/10 text-white' : 'bg-gradient-to-br from-[#06B6D4]/10 to-transparent border border-[#06B6D4]/30 text-[#E5E5E5]'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="border-t border-white/10 p-3 flex gap-2 bg-[#050508]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ENTER INTEL QUERY..."
              className="bg-transparent border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-[#06B6D4] flex-1 rounded-sm font-mono placeholder:text-neutral-600 transition-colors"
            />
            <button
              type="submit"
              className="bg-white/[0.05] border border-white/10 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-[#0D0D11] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </div>
  );
}