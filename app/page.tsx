'use client';

import { Canvas } from '@react-three/fiber';
import LiquidLogo from './components/LiquidLogo';
import GridBackground from './components/GridBackground';
import TraitGallery from './components/TraitGallery';
import Documentation from './Documentation';
import Footer from './components/Footer';
import RoadmapFAQ from './components/RoadmapFAQ';
import SyndicateChatbot from './components/SyndicateChatbot';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [logoScale, setLogoScale] = useState(1.0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setLogoScale(1.0);
      } else if (width > 640 && width <= 1024) {
        setLogoScale(0.75); 
      } else {
        setLogoScale(0.55);
      }
    };

    handleResize(); 
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <div style={{ backgroundColor: '#0D0D11', minHeight: '100vh', color: '#E5E5E5', fontFamily: 'var(--font-geist-sans), sans-serif' }}>
      
      {/* GLOBAL CSS INJECTION */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        .premium-btn {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #E5E5E5;
          backdrop-filter: blur(8px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .premium-btn:hover {
          background-color: #E5E5E5;
          color: #0D0D11;
          border-color: #E5E5E5;
          transform: translateY(-1px);
        }
        .nav-link {
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #A3A3A3;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 2px;
        }
        .nav-link:hover {
          color: #E5E5E5;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #06B6D4;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .scroll-fade {
          background: linear-gradient(to bottom, transparent, rgba(13,13,17,1));
        }
      `}</style>

      {/* MOBILE FULLSCREEN MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D0D11]/98 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-300">
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors cursor-pointer p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col items-center gap-10 font-mono text-sm tracking-[0.25em]">
            <a href="#protocol" onClick={() => setIsMobileMenuOpen(false)} className="text-[#A3A3A3] hover:text-[#E5E5E5] transition-colors">PROTOCOL</a>
            <a href="#archive" onClick={() => setIsMobileMenuOpen(false)} className="text-[#A3A3A3] hover:text-[#E5E5E5] transition-colors">ARCHIVE</a>
            <a href="#blueprints" onClick={() => setIsMobileMenuOpen(false)} className="text-[#A3A3A3] hover:text-[#E5E5E5] transition-colors">BLUEPRINTS</a>
            <a href="#intel" onClick={() => setIsMobileMenuOpen(false)} className="text-[#A3A3A3] hover:text-[#E5E5E5] transition-colors">INTEL</a>
            <a href="#founder" onClick={() => setIsMobileMenuOpen(false)} className="text-[#06B6D4] hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">SYNDICATE</a>
          </div>
        </div>
      )}

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
        <nav className="absolute top-0 w-full z-20 flex justify-between items-center px-4 sm:px-8 py-5 box-border">
          
          {/* LEFT: DESKTOP INTEL ANCHOR LINKS (Hidden on tablet/mobile) */}
          <div className="hidden lg:flex justify-start w-1/3 gap-6 xl:gap-8 items-center z-30">
            <a href="#protocol" className="nav-link">PROTOCOL</a>
            <a href="#archive" className="nav-link">ARCHIVE</a>
            <a href="#blueprints" className="nav-link">BLUEPRINTS</a>
            <a href="#intel" className="nav-link">INTEL</a>
            <a href="#founder" className="nav-link text-[#06B6D4]">SYNDICATE</a>
          </div>

          {/* LEFT: MOBILE HAMBURGER MENU */}
          <div className="flex lg:hidden justify-start w-1/3 z-30">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="text-[#E5E5E5] hover:text-[#06B6D4] transition-colors cursor-pointer p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* CENTER: LOGO CREST */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img src="/assets/logo-crest.png" alt="Numb Polys Crest" className="h-10 w-auto sm:h-14 opacity-95 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500" />
          </div>

          {/* RIGHT: TERMINAL ACCESS */}
          <div className="flex justify-end w-[60%] lg:w-1/3 z-30">
            <a 
              href="https://testnet.numbpolys.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="premium-btn font-mono text-[8px] sm:text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 block whitespace-nowrap rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              Testnet Terminal
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
            fontSize: '11px', 
            letterSpacing: '0.15em', 
            color: '#A3A3A3',
            textTransform: 'uppercase',
            lineHeight: '1.8',
          }}>
            <span style={{ color: '#E5E5E5', opacity: 0.5 }}>|</span> 1,111 HIGH-POLY CONSTRUCTS SECURED ON SUI.<br/>
            THE 6 SYNDICATE TIERS DICTATE YOUR CLEARANCE.
          </p>
        </div>

        {/* HERO FOOTER & SCROLL ANCHOR */}
        <footer className="scroll-fade" style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '2rem', height: '150px', boxSizing: 'border-box' }}>
          <div className="font-mono text-[10px] sm:text-xs tracking-widest text-neutral-500">
            NUMB POLYS<sup className="text-[8px] ml-0.5">©</sup>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="animate-bounce text-[#E5E5E5] text-[10px] sm:text-xs tracking-widest opacity-50 uppercase">
              Scroll to Explore
            </div>
          </div>
          
          <div className="footer-links flex items-center gap-5">
            <a href="https://x.com/numbpolys" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#E5E5E5] transition-colors" aria-label="X (Twitter)">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://discord.gg/uVfu3Vg9Bf" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#E5E5E5] transition-colors" aria-label="Discord">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </footer>

      </div>

      {/* CONTENT SECTIONS WITH ID ANCHORS */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: '#0D0D11', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        
        <div id="protocol" style={{ padding: '4rem 0' }}>
          <TraitGallery />
        </div>

        <div id="archive" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0' }}>
          <Documentation />
        </div>

        <div id="blueprints" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0' }}>
          <RoadmapFAQ />
        </div>

        <div id="intel" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Ensure your RoadmapFAQ component contains the FAQ/Intel section */}
        </div>

        <div id="founder" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Footer />
        </div>
      </div>

      {/* AI CHATBOT INTERFACE */}
      <SyndicateChatbot />
    </div>
  );
}