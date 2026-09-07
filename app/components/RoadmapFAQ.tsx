'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What is Numb Polys?",
    answer: "Numb Polys is a premium, 1,111 Sui-piece 3D generative digital collection on . Moving away from standard algorithmic noise, every construct is deliberately crafted using custom PBR material shading, low-poly geometry, and exact material matching to create high-end visual identities for Web3 operatives."
  },
  {
    question: "When is the mint and where?",
    answer: "Mint parameters, launch dates, and exact supply metrics will be decrypted across our official X account (@NumbPolys) and Discord. The collection will be deployed natively on the Sui network."
  },
  {
    question: "How do I get Syndicate Clearance (Whitelist)?",
    answer: "We do not run generic lotteries. Syndicate clearance is vetted directly through high-signal ecosystem involvement, active network contribution, and deliberate Discord intake."
  },
  {
    question: "What chain is Numb Polys deployed on?",
    answer: "Numb Polys is deployed natively on the Sui blockchain for instant finality, low transaction costs, and seamless underworld marketplace execution."
  },
  {
    question: "What is the utility?",
    answer: "Every holder receives full commercial IP rights and exclusive access to gated syndicate channels based on their precise Rarity Tier (Civilian through Kingpin). Active operators will also gain classified access to future independent Web3 infrastructure currently being built in the shadows."
  }
];

export default function RoadmapFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="bg-transparent text-white w-full py-24 px-6 sm:px-12 lg:px-24 border-t border-[#00ff00]/10 relative z-10 font-mono">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: THE PLAN & TEAM */}
        <div className="lg:col-span-7 space-y-20">
          
          {/* THE PLAN / ROADMAP */}
          <div>
            <h2 className="text-xl sm:text-2xl mb-8 tracking-widest text-[#00ff00] uppercase drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]">
              // THE BLUEPRINT
            </h2>
            
            <div className="space-y-12">
              {/* Phase 01 */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-6 border-b border-[#00ff00]/20 pb-2">
                  PHASE 01 — INFILTRATION
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm tracking-wide">
                  <li className="flex justify-between items-center border-l-2 border-[#00ff00]/40 pl-4">
                    <span className="text-neutral-200">3D Asset & Layer Generation</span>
                    <span className="text-[#00ff00] bg-[#00ff00]/10 border border-[#00ff00]/30 px-2 py-1 text-[10px] sm:text-xs">[ DONE ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-[#00ff00]/40 pl-4">
                    <span className="text-neutral-200">Smart Contract & Tier Matrix</span>
                    <span className="text-[#00ff00] bg-[#00ff00]/10 border border-[#00ff00]/30 px-2 py-1 text-[10px] sm:text-xs">[ DONE ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-[#00ff00]/40 pl-4">
                    <span className="text-neutral-200">The 1,111 Widescreen Grid Reveal</span>
                    <span className="text-[#00ff00] bg-[#00ff00]/10 border border-[#00ff00]/30 px-2 py-1 text-[10px] sm:text-xs">[ DONE ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-[#00ff00] pl-4">
                    <span className="text-white font-bold drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">Syndicate Recruitment & Clearance</span>
                    <span className="text-[#050505] bg-[#00ff00] px-2 py-1 text-[10px] sm:text-xs font-bold animate-pulse">[ LIVE ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-neutral-800 pl-4 text-neutral-500">
                    <span>1,111 Construct Mint Protocol</span>
                    <span className="text-[10px] sm:text-xs">[ TBA ]</span>
                  </li>
                </ul>
              </div>

              {/* Phase 02 */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-6 border-b border-[#00ff00]/20 pb-2">
                  PHASE 02 — CONSOLIDATION
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm tracking-wide text-neutral-500">
                  <li className="flex justify-between items-center border-l-2 border-neutral-800 pl-4">
                    <span>Treasury Protocol Activation</span>
                    <span className="text-[10px] sm:text-xs">[ SOON ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-neutral-800 pl-4">
                    <span>Sui Ecosystem Partnerships</span>
                    <span className="text-[10px] sm:text-xs">[ SOON ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-neutral-800 pl-4">
                    <span>Tier-Based Holder Classification</span>
                    <span className="text-[10px] sm:text-xs">[ SOON ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-neutral-800 pl-4">
                    <span>Commercial IP Rights Unlocked</span>
                    <span className="text-[10px] sm:text-xs">[ SOON ]</span>
                  </li>
                </ul>
              </div>
              
              {/* Phase 03 */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-6 border-b border-[#00ff00]/20 pb-2">
                  PHASE 03 — THE UNKNOWN
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm tracking-wide text-neutral-500">
                  <li className="flex justify-between items-center border-l-2 border-neutral-800 pl-4">
                    <span>[REDACTED] Independent Infrastructure</span>
                    <span className="text-[#00ff00]/50 text-[10px] sm:text-xs">[ CLASSIFIED ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-neutral-800 pl-4">
                    <span>[REDACTED] Expansion Directives</span>
                    <span className="text-[#00ff00]/50 text-[10px] sm:text-xs">[ CLASSIFIED ]</span>
                  </li>
                </ul>
                <p className="text-[10px] text-[#00ff00] mt-6 lowercase tracking-widest opacity-70">
                  &gt; active operators decrypt first_
                </p>
              </div>
            </div>
          </div>

          {/* THE TEAM */}
          <div>
            <h2 className="text-xl sm:text-2xl mb-4 tracking-widest text-[#00ff00] uppercase drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]">
              // THE SYNDICATE
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8 max-w-lg">
              Operating in the shadows. Numb Polys is architected solely by Nuele, executing Low-poly generative asset design, full-stack development, and strategic ecosystem expansion directly on the Sui network.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="border border-[#00ff00]/20 bg-[#050505] p-6 hover:border-[#00ff00] hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] transition-all flex items-center gap-5 group cursor-default">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 border border-[#00ff00] scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src="/assets/68.png" alt="Nuele" className="w-14 h-14 object-cover border border-[#00ff00]/30 grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <div>
                  <p className="text-lg mb-1 text-white group-hover:text-[#00ff00] transition-colors uppercase">Nuele </p>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-widest mb-2">Creator & Lead Architect</p>
                  <a href="https://x.com/Nue1e" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#00ff00] hover:text-white transition-colors block">
                    [ 𝕏 @Nue1e ]
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQ ACCORDION */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <h2 className="text-xl sm:text-2xl mb-8 tracking-widest text-[#00ff00] uppercase drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]">
              // INTEL
            </h2>
            
            <div className="border-t border-[#00ff00]/20">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#00ff00]/20">
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 flex justify-between items-center text-left focus:outline-none group hover:bg-[#00ff00]/5 px-4 -mx-4 transition-colors"
                  >
                    <span className={`text-xs sm:text-sm tracking-wide transition-colors ${openFAQ === index ? 'text-[#00ff00]' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                      {String(index + 1).padStart(2, '0')}. {faq.question}
                    </span>
                    <span className={`text-lg transition-colors ${openFAQ === index ? 'text-[#00ff00]' : 'text-neutral-600 group-hover:text-[#00ff00]'}`}>
                      {openFAQ === index ? '[ - ]' : '[ + ]'}
                    </span>
                  </button>
                  
                  {/* Expandable Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out px-4 -mx-4 ${
                      openFAQ === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed pr-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}