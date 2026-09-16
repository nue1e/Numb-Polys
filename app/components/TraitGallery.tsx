'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import BustShaderCard from './BustShaderCard';

const traits = [
  {
    id: '01',
    category: 'MYTHIC / THE UNKNOWN',
    title: 'THE ANOMALIES',
    description: 'CUSTOM 1-OF-1 GRAILS FEATURING HANDCRAFTED MESH EDITS, EXCLUSIVE SHADERS, AND UNIQUE ASSET BUILDS. LED BY THE GOLDEN RUNNER.',
    tag: '11 UNITS',
    imageUrl: '/assets/1102.png',
  },
  {
    id: '02',
    category: 'LEGENDARY / KINGPIN',
    title: 'THE APEX',
    description: 'THE ELITE OPERATORS OF THE SYNDICATE. EQUIPPED WITH EXCLUSIVE IRIDESCENT SKINS, OIL SLICKS, AND GOLD-VEINED MARBLES TO DICTATE THE UNDERWORLD.',
    tag: '55 UNITS',
    imageUrl: '/assets/36.png',
  },
  {
    id: '03',
    category: 'EPIC / GHOST',
    title: 'PHANTOM CLASS',
    description: 'HIGH-COMPLEXITY PATTERNS, SOLAR GRIDS, AND BIOLUMINESCENT SKINS DESIGNED FOR STEALTH, HIGH-STAKES INFILTRATION, AND ZERO-TRACE TACTICS.',
    tag: '110 UNITS',
    imageUrl: '/assets/13.png',
  },
  {
    id: '04',
    category: 'RARE / ENFORCER',
    title: 'TACTICAL HEAVY',
    description: 'HARDENED CONSTRUCTS FORGED WITH PURE METALS, COPPER, AND CHAMPAGNE GOLD. THE METHODICAL ENFORCERS OF THE GRID.',
    tag: '220 UNITS',
    imageUrl: '/assets/3.png',
  },
  {
    id: '05',
    category: 'UNCOMMON / ROGUE',
    title: 'FIELD OPERATIVE',
    description: 'METHODICAL UNITS FEATURING DARK BRONZES, SILVERS, AND VANTABLACK BASES. THE ACTIVE DATA ROUTERS AND GROUND FORCES OF THE NETWORK.',
    tag: '330 UNITS',
    imageUrl: '/assets/7.png',
  },
  {
    id: '06',
    category: 'COMMON / CIVILIAN',
    title: 'STANDARD ISSUE',
    description: 'SMOOTH, MATTE CLAYS AND EARTH TONES. CLEAN, MINIMALIST BUILDS FORMING THE FOUNDATIONAL ROSTER OF THE SYNDICATE.',
    tag: '385 UNITS',
    imageUrl: '/assets/4.png',
  },
];

export default function TraitGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null); 
  const [scrollRange, setScrollRange] = useState(0);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(trackWidth - viewportWidth);
      }
    };

    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const toggleCard = (id: string) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  return (
    <section ref={targetRef} className="relative h-[300vh] text-[#E5E5E5] bg-transparent touch-pan-y font-sans">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="absolute top-10 left-6 z-20 md:top-14 md:left-14 pointer-events-none">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#A3A3A3] uppercase">
            | ARC CLEARANCE PROTOCOL
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl font-medium uppercase tracking-widest text-[#E5E5E5] md:text-4xl">
            6 Syndicate Tiers
          </h2>
        </div>

        {/* Horizontal Sliding Cards Track */}
        <motion.div 
          ref={trackRef} 
          style={{ x }} 
          className="flex w-max gap-6 px-6 sm:gap-8 sm:px-8 md:gap-12 md:px-14 mt-24 md:mt-32 will-change-transform"
        >
          {traits.map((trait) => {
            const isExpanded = activeCardId === trait.id;

            return (
              <div
                key={trait.id}
                onClick={() => toggleCard(trait.id)}
                className="group relative flex aspect-square w-[85vw] sm:w-[45vw] md:w-[40vw] lg:w-[30vw] max-w-[420px] flex-col justify-between border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:border-white/30 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(79,70,229,0.15)] shrink-0 rounded-sm"
              >
                
                {/* 1. COSMIC AURA HOVER EFFECT & WEBGL SHADER */}
                <div className="absolute inset-0 z-0 opacity-50 transition-opacity duration-700 group-hover:opacity-100">
                  {/* Premium glowing background gradient that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-[#8B5CF6]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={1} />
                    <BustShaderCard imageUrl={trait.imageUrl} />
                  </Canvas>
                </div>

                {/* 2. TOP SECTION: ID, TAG, CATEGORY, & TITLE */}
                <div className="relative z-10 space-y-1 pointer-events-none">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[10px] sm:text-xs text-neutral-500">
                      <span className="text-white">{trait.id}</span>
                    </span>
                    <span className="border border-white/20 bg-white/5 backdrop-blur-md px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] tracking-wider uppercase text-white rounded-sm">
                      {trait.tag}
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#A3A3A3] uppercase">
                      {trait.category}
                    </p>
                    <h3 className="text-lg sm:text-2xl font-semibold uppercase tracking-wider text-white transition-colors duration-300">
                      {trait.title}
                    </h3>
                  </div>
                </div>

                {/* 3. CLICK-TO-REVEAL LORE OVERLAY (DECRYPTED DOSSIER) */}
                <div 
                  className={`absolute inset-0 bg-[#0D0D11]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between z-30 transition-all duration-500 ease-out ${
                    isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono">
                    <span className="text-[10px] sm:text-xs text-[#06B6D4] uppercase tracking-widest">| DOSSIER UNLOCKED</span>
                    <span className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer">[ ESC ]</span>
                  </div>

                  <div className="my-auto space-y-3">
                    <p className="font-mono text-[10px] sm:text-xs text-[#E5E5E5] tracking-wider uppercase">{trait.category}</p>
                    <p className="text-sm sm:text-base leading-relaxed text-[#A3A3A3] font-light">
                      {trait.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-neutral-500">
                    <span>NUMB_POLYS_ARC</span>
                    <span className="text-[#06B6D4] animate-pulse">● SECURED</span>
                  </div>
                </div>

                {/* 4. BOTTOM FOOTER LINE */}
                <div className="absolute bottom-0 left-0 w-full z-10 flex items-center justify-between border-t border-white/5 py-4 px-6 sm:px-8 text-[10px] text-[#A3A3A3] font-mono pointer-events-none bg-white/[0.02] backdrop-blur-md transition-colors duration-500 group-hover:border-white/20">
                  <span className="uppercase tracking-wider transition-colors duration-300 group-hover:text-white">
                    {isExpanded ? 'SYSTEM ALERT: FILE OPEN' : '[ INSPECT ASSET ]'}
                  </span>
                  <span className={`transition-transform duration-500 ${isExpanded ? 'rotate-90 text-[#06B6D4]' : 'group-hover:translate-x-1 text-white'}`}>
                    →
                  </span>
                </div>

              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}