'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What is Numb Polys?",
    answer: "Numb Polys is a premium, 1,111-piece 3D generative digital collection on Arc. Moving away from standard algorithmic noise, every construct is deliberately crafted using custom PBR material shading, low-poly geometry, and exact material matching to create high-end visual identities for Web3 operatives."
  },
  {
    question: "When is the mint and where?",
    answer: "Mint parameters, launch dates, and exact supply metrics will be decrypted across our official X account (@NumbPolys) and Discord. The collection will be deployed natively on the Arc network."
  },
  {
    question: "How do I get Syndicate Clearance (Whitelist)?",
    answer: "We do not run generic lotteries. Syndicate clearance is vetted directly through high-signal ecosystem involvement, active network contribution, and deliberate Discord intake."
  },
  {
    question: "What chain is Numb Polys deployed on?",
    answer: "Numb Polys is deployed natively on the Arc blockchain for premium execution, instant finality, and seamless high-tier marketplace integration."
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
    <section className="bg-transparent text-[#E5E5E5] w-full py-24 px-6 sm:px-12 lg:px-24 border-t border-white/5 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: THE PLAN & TEAM */}
        <div className="lg:col-span-7 space-y-20">
          
          {/* THE PLAN / ROADMAP */}
          <div>
            <h2 className="text-xl sm:text-2xl mb-8 tracking-widest text-white uppercase font-medium">
              | The Blueprint
            </h2>
            
            <div className="space-y-12">
              {/* Phase 01 */}
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-[#06B6D4] mb-6 border-b border-white/10 pb-2">
                  Phase 01 — Infiltration
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm tracking-wide font-light">
                  <li className="flex justify-between items-center border-l-2 border-white/20 pl-4">
                    <span className="text-[#A3A3A3]">3D Asset & Layer Generation</span>
                    <span className="text-white bg-white/5 border border-white/10 px-2 py-1 text-[10px] sm:text-xs rounded-sm">[ SECURED ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/20 pl-4">
                    <span className="text-[#A3A3A3]">Smart Contract & Tier Matrix</span>
                    <span className="text-white bg-white/5 border border-white/10 px-2 py-1 text-[10px] sm:text-xs rounded-sm">[ SECURED ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/20 pl-4">
                    <span className="text-[#A3A3A3]">The 1,111 Widescreen Grid Reveal</span>
                    <span className="text-white bg-white/5 border border-white/10 px-2 py-1 text-[10px] sm:text-xs rounded-sm">[ SECURED ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-[#06B6D4] pl-4">
                    <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">Syndicate Recruitment & Clearance</span>
                    <span className="text-[#0D0D11] bg-[#06B6D4] px-2 py-1 text-[10px] sm:text-xs font-bold animate-pulse rounded-sm">[ ACTIVE ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/5 pl-4 text-neutral-600">
                    <span>1,111 Construct Mint Protocol</span>
                    <span className="font-mono text-[10px] sm:text-xs">[ PENDING ]</span>
                  </li>
                </ul>
              </div>

              {/* Phase 02 */}
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-[#06B6D4] mb-6 border-b border-white/10 pb-2">
                  Phase 02 — Consolidation
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm tracking-wide text-neutral-500 font-light">
                  <li className="flex justify-between items-center border-l-2 border-white/5 pl-4">
                    <span>Treasury Protocol Activation</span>
                    <span className="font-mono text-[10px] sm:text-xs">[ STANDBY ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/5 pl-4">
                    <span>Arc Ecosystem Integration</span>
                    <span className="font-mono text-[10px] sm:text-xs">[ STANDBY ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/5 pl-4">
                    <span>Tier-Based Holder Classification</span>
                    <span className="font-mono text-[10px] sm:text-xs">[ STANDBY ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/5 pl-4">
                    <span>Commercial IP Rights Unlocked</span>
                    <span className="font-mono text-[10px] sm:text-xs">[ STANDBY ]</span>
                  </li>
                </ul>
              </div>
              
              {/* Phase 03 */}
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-[#06B6D4] mb-6 border-b border-white/10 pb-2">
                  Phase 03 — The Unknown
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm tracking-wide text-neutral-500 font-light">
                  <li className="flex justify-between items-center border-l-2 border-white/5 pl-4">
                    <span>[REDACTED] Independent Infrastructure</span>
                    <span className="text-[#4F46E5] font-mono text-[10px] sm:text-xs">[ CLASSIFIED ]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/5 pl-4">
                    <span>[REDACTED] Expansion Directives</span>
                    <span className="text-[#4F46E5] font-mono text-[10px] sm:text-xs">[ CLASSIFIED ]</span>
                  </li>
                </ul>
                <p className="font-mono text-[10px] text-[#A3A3A3] mt-6 tracking-widest opacity-70">
                  | clearance required to decrypt remaining files
                </p>
              </div>
            </div>
          </div>

          {/* THE TEAM */}
          <div>
            <h2 className="text-xl sm:text-2xl mb-4 tracking-widest text-white uppercase font-medium">
              | The Syndicate
            </h2>
            <p className="text-[#A3A3A3] text-xs sm:text-sm leading-relaxed mb-8 max-w-lg font-light">
              Operating in the shadows. Numb Polys is architected solely by nue1e, executing low-poly generative asset design, full-stack development, and strategic ecosystem expansion directly on the Arc network.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 hover:border-white/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all duration-500 flex items-center gap-5 group cursor-default rounded-sm">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 border border-[#06B6D4] scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img src="/assets/68.png" alt="nue1e" className="w-14 h-14 object-cover border border-white/20 grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm" />
                </div>
                <div>
                  <p className="text-lg mb-1 font-medium text-white group-hover:text-[#06B6D4] transition-colors uppercase tracking-wider">nue1e</p>
                  <p className="font-mono text-[9px] text-[#A3A3A3] uppercase tracking-widest mb-2">Creator & Lead Architect</p>
                  <a href="https://x.com/nue1e" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[#4F46E5] hover:text-[#06B6D4] transition-colors block">
                    [ 𝕏 @nue1e ]
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQ ACCORDION */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <h2 className="text-xl sm:text-2xl mb-8 tracking-widest text-white uppercase font-medium">
              | Intel
            </h2>
            
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10">
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 flex justify-between items-center text-left focus:outline-none group hover:bg-white/[0.02] px-4 -mx-4 transition-colors"
                  >
                    <span className={`text-xs sm:text-sm tracking-wide transition-colors font-medium ${openFAQ === index ? 'text-[#06B6D4]' : 'text-white group-hover:text-[#A3A3A3]'}`}>
                      <span className="font-mono text-[#A3A3A3] mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {faq.question}
                    </span>
                    <span className={`font-mono text-lg transition-colors ${openFAQ === index ? 'text-[#06B6D4]' : 'text-[#A3A3A3] group-hover:text-white'}`}>
                      {openFAQ === index ? '-' : '+'}
                    </span>
                  </button>
                  
                  {/* Expandable Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out px-4 -mx-4 ${
                      openFAQ === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[#A3A3A3] text-xs sm:text-sm leading-relaxed pr-4 font-light">
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