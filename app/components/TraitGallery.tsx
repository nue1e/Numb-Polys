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
    <section ref={targetRef} className="relative h-[300vh] text-white bg-transparent touch-pan-y font-mono">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="absolute top-10 left-6 z-20 md:top-14 md:left-14 pointer-events-none">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#00ff00] uppercase opacity-80">
            // SYNDICATE CLEARANCE PROTOCOL
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold uppercase tracking-wider text-white md:text-4xl drop-shadow-[0_0_8px_rgba(0,255,0,0.2)]">
            6 SYNDICATE TIERS
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
                className="group relative flex aspect-square w-[85vw] sm:w-[45vw] md:w-[40vw] lg:w-[30vw] max-w-[420px] flex-col justify-between border border-neutral-800 bg-[#050505] p-6 sm:p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#00ff00] hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] shrink-0"
              >
                
                {/* 1. WEBGL SHADER BACKGROUND ART */}
                <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-500 group-hover:opacity-80">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={1} />
                    <BustShaderCard imageUrl={trait.imageUrl} />
                  </Canvas>
                </div>

                {/* 2. TOP SECTION: ID, TAG, CATEGORY, & TITLE */}
                <div className="relative z-10 space-y-1 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs text-neutral-500">
                      <span className="text-[#00ff00]">{trait.id}</span> // 06
                    </span>
                    <span className="border border-[#00ff00]/30 bg-black/90 px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] tracking-wider uppercase text-[#00ff00]">
                      {trait.tag}
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="text-[8px] sm:text-[9px] tracking-widest text-neutral-400 uppercase">
                      {trait.category}
                    </p>
                    <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-[#00ff00] transition-colors duration-300">
                      {trait.title}
                    </h3>
                  </div>
                </div>

                {/* 3. CLICK-TO-REVEAL LORE OVERLAY (DECRYPTED DOSSIER) */}
                <div 
                  className={`absolute inset-0 bg-black/95 backdrop-blur-md border border-[#00ff00]/20 p-6 sm:p-8 flex flex-col justify-between z-30 transition-all duration-300 ease-out ${
                    isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <span className="text-[10px] sm:text-xs text-[#00ff00] uppercase tracking-widest">// DOSSIER DECRYPTED</span>
                    <span className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer">[ ESC ]</span>
                  </div>

                  <div className="my-auto space-y-3">
                    <p className="text-[10px] sm:text-xs text-[#00ff00] tracking-wider uppercase">{trait.category}</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-300">
                      {trait.description}
                    </p>
                  </div>

                  <div className="border-t border-neutral-800 pt-4 flex justify-between items-center text-[9px] sm:text-[10px] text-neutral-500">
                    <span>NUMB_POLYS_NETWORK</span>
                    <span className="text-[#00ff00] animate-pulse">● ACTIVE</span>
                  </div>
                </div>

                {/* 4. BOTTOM FOOTER LINE */}
                <div className="absolute bottom-0 left-0 w-full z-10 flex items-center justify-between border-t border-neutral-800/90 py-4 px-6 sm:px-8 text-[10px] text-neutral-400 pointer-events-none bg-black/60 backdrop-blur-sm transition-colors duration-300 group-hover:border-[#00ff00]/50">
                  <span className="text-neutral-300 uppercase tracking-wider group-hover:text-[#00ff00]">
                    {isExpanded ? 'SYSTEM ALERT: FILE OPEN' : '[ INITIALIZE DOSSIER ]'}
                  </span>
                  <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#00ff00]' : 'group-hover:translate-x-1 text-white'}`}>
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