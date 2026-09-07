'use client';

import { Canvas } from '@react-three/fiber';
import LiquidLogo from './components/LiquidLogo';
import GridBackground from './components/GridBackground';
import TraitGallery from './components/TraitGallery';
import Documentation from './Documentation';
import Footer from './components/Footer';
import RoadmapFAQ from './components/RoadmapFAQ';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [logoScale, setLogoScale] = useState(1.0);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setLogoScale(1.0);
      } else if (width > 640 && width <= 1024) {
        setLogoScale(0.75); 
      } else {
        setLogoScale(0.55); // Slightly bumped from 0.5 to keep mobile impact high
      }
    };

    handleResize(); 
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* GLOBAL CSS INJECTION FOR TERMINAL BUTTONS */}
      <style>{`
        .terminal-btn {
          background-color: rgba(10, 10, 10, 0.8);
          border: 1px solid #00ff00;
          color: #00ff00;
          text-shadow: 0 0 5px rgba(0,255,0,0.5);
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.15);
          transition: all 0.2s ease;
        }
        .terminal-btn:hover {
          background-color: rgba(0, 255, 0, 0.1);
          box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
        }
        .scroll-fade {
          background: linear-gradient(to bottom, transparent, rgba(5,5,5,1));
        }
      `}</style>

      {/* 1. THE AMBIENT GRID BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={1} />
          <GridBackground />
        </Canvas>
      </div>

      {/* 2. SYNDICATE HERO FOREGROUND */}
      <div style={{ position: 'relative', width: '100%', height: '100dvh', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        
        {/* NAVIGATION */}
        <nav className="w-full grid grid-cols-3 items-center px-4 sm:px-8 py-6 box-border relative z-20">
          <div></div>
          
          <div className="flex justify-center items-center">
            <img src="/assets/logo-crest.png" alt="Numb Polys Crest" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(0,255,0,0.3)]" />
          </div>

          <div className="flex justify-end">
            <a 
              href="https://testnet.numbpolys.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="terminal-btn font-mono text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 block whitespace-nowrap"
            >
              [ INITIATE TESTNET ]
            </a>
          </div>
        </nav>

        {/* LOGO CANVAS */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
             <ambientLight intensity={1} />
             <group scale={logoScale}>
               <LiquidLogo imageUrl="/assets/numb-logo.png" />
             </group>
          </Canvas>
        </div>

        {/* PROJECT MANIFESTO TEXT */}
        <div style={{ 
          position: 'absolute', 
          top: '70%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 20, 
          textAlign: 'center',
          width: '90%',
          maxWidth: '600px',
          pointerEvents: 'none'
        }}>
          <p style={{ 
            fontFamily: 'monospace', 
            fontSize: '11px', 
            letterSpacing: '2px', 
            color: '#a3a3a3',
            textTransform: 'uppercase',
            lineHeight: '1.8',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            <span style={{ color: '#00ff00' }}>//</span> 1,111 LOW-POLY TACTICAL CONSTRUCTS SECURED OFF THE GRID.<br/>
            THE 6 SYNDICATE TIERS DICTATE YOUR CLEARANCE LEVEL.
          </p>
        </div>

        {/* HERO FOOTER & SCROLL ANCHOR */}
        <footer className="scroll-fade" style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '2rem', height: '150px', boxSizing: 'border-box' }}>
          <div className="font-mono text-xs text-neutral-500">© NUMB_POLYS 2026</div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="animate-bounce text-[#00ff00] text-xs font-mono opacity-70">↓ SCROLL TO DECRYPT ↓</div>
          </div>
          
          <div className="footer-links flex items-center gap-5">
            <a href="https://x.com/numbpolys" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#00ff00] transition-colors" aria-label="X (Twitter)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://discord.gg/uVfu3Vg9Bf" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#00ff00] transition-colors" aria-label="Discord">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </footer>
      </div>

      {/* CONTENT SECTIONS */}
      {/* The background here is slightly opaque black to let the 3D grid faintly show through while keeping text readable */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(0,255,0,0.1)' }}>
        
        <div style={{ padding: '4rem 0' }}>
          <TraitGallery />
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0' }}>
          <Documentation />
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0' }}>
          <RoadmapFAQ />
        </div>

        <div style={{ borderTop: '1px solid rgba(0,255,0,0.2)' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}