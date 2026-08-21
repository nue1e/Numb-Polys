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
    <section className="bg-transparent text-white w-full py-24 px-6 sm:px-12 lg:px-24 border-t border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: THE PLAN & TEAM */}
        <div className="lg:col-span-7 space-y-20">
          
          {/* THE PLAN / ROADMAP */}
          <div>
            <h2 className="font-serif italic text-3xl mb-8 tracking-wide text-white">the blueprint</h2>
            
            <div className="space-y-12">
              {/* Phase 01 */}
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-6 border-b border-white/10 pb-2">
                  PHASE 01 — Infiltration
                </h3>
                <ul className="space-y-4 font-mono text-xs sm:text-sm tracking-wide">
                  <li className="flex justify-between items-center border-l-2 border-white/20 pl-4">
                    <span className="text-white">3D Asset & Layer Generation</span>
                    <span className="text-white bg-white/10 backdrop-blur-sm px-2 py-1 text-[10px] sm:text-xs">[DONE]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/20 pl-4">
                    <span className="text-white">Smart Contract & Tier Matrix</span>
                    <span className="text-white bg-white/10 backdrop-blur-sm px-2 py-1 text-[10px] sm:text-xs">[DONE]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/20 pl-4">
                    <span className="text-white">The 1,111 Widescreen Grid Reveal</span>
                    <span className="text-white bg-white/10 backdrop-blur-sm px-2 py-1 text-[10px] sm:text-xs">[DONE]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-[#b084ff] pl-4">
                    <span className="text-white">Syndicate Recruitment & Clearance</span>
                    <span className="text-[#b084ff] bg-[#b084ff]/20 backdrop-blur-sm px-2 py-1 text-[10px] sm:text-xs">[LIVE]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4 text-neutral-400">
                    <span>1,111 Construct Mint Protocol</span>
                    <span className="text-[10px] sm:text-xs">[TBA]</span>
                  </li>
                </ul>
              </div>

              {/* Phase 02 */}
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-6 border-b border-white/10 pb-2">
                  PHASE 02 — Consolidation
                </h3>
                <ul className="space-y-4 font-mono text-xs sm:text-sm tracking-wide text-neutral-400">
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Treasury Protocol Activation</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Sui Ecosystem Partnerships</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Tier-Based Holder Classification</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Commercial IP Rights Unlocked</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                </ul>
              </div>
              
              {/* Phase 03 */}
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-6 border-b border-white/10 pb-2">
                  PHASE 03 — The Unknown
                </h3>
                <ul className="space-y-4 font-mono text-xs sm:text-sm tracking-wide text-neutral-400">
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>[REDACTED] Independent Infrastructure</span>
                    <span className="text-[10px] sm:text-xs">[CLASSIFIED]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>[REDACTED] Expansion Directives</span>
                    <span className="text-[10px] sm:text-xs">[CLASSIFIED]</span>
                  </li>
                </ul>
                <p className="font-mono text-[10px] text-neutral-500 mt-6 lowercase tracking-widest">
                  active operators decrypt first_
                </p>
              </div>
            </div>
          </div>

          {/* THE TEAM */}
          <div>
            <h2 className="font-serif italic text-3xl mb-4 tracking-wide text-white">the syndicate</h2>
            <p className="text-neutral-300 text-sm leading-relaxed mb-8 max-w-lg">
              Operating in the shadows. Numb Polys is architected solely by Nuele, executing Low-poly generative asset design, full-stack development, and strategic ecosystem expansion directly on the Sui network.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 hover:border-white/30 transition-colors flex items-center gap-5">
                <div className="flex-shrink-0">
                  <img src="/assets/68.png" alt="Nuele" className="w-14 h-14 rounded-full object-cover border border-white/20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div>
                  <p className="font-serif text-2xl mb-1 text-white">Nuele </p>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Creator & Lead Architect</p>
                  <a href="https://x.com/Nue1e" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#b084ff] hover:text-white transition-colors block">
                    𝕏 @Nue1e
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQ ACCORDION */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <h2 className="font-serif italic text-3xl mb-8 tracking-wide text-white">intel</h2>
            
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10">
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                  >
                    <span className={`font-mono text-sm tracking-wide transition-colors ${openFAQ === index ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                      {index + 1}. {faq.question}
                    </span>
                    <span className="font-mono text-lg text-neutral-500 ml-4 group-hover:text-white transition-colors">
                      {openFAQ === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  {/* Expandable Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-neutral-300 text-sm leading-relaxed pr-4">
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