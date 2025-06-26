"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Crown, Sparkles, X } from 'lucide-react';

const BackdoorEasterEgg = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [keySequence, setKeySequence] = useState([]);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });

  // ====== CONFIGURATION - UPDATE YOUR RESUME LINK HERE ======
  const RESUME_LINK = "https://drive.google.com/file/d/1KX7ByEFcbZWeD2rtcsETMYN6vm7HJvWj/view?usp=sharing"; 
  
  // Easter egg methods
  const SECRET_CODE = ['KeyR', 'KeyI', 'KeyF', 'KeyA']; // Type "HIREME"
  const REQUIRED_LOGO_CLICKS = 7;

  // ====== METHOD 1: KEYBOARD SEQUENCE ======
  const handleKeyDown = useCallback((e) => {
    setKeySequence(prev => {
      const newSequence = [...prev, e.code].slice(-SECRET_CODE.length);
      
      // Check SECRET_CODE (HIREME)
      if (JSON.stringify(newSequence) === JSON.stringify(SECRET_CODE)) {
        triggerBackdoor('Secret Word');
        return [];
      }
      
      return newSequence;
    });
  }, []);

  // ====== METHOD 2: CONSOLE COMMAND ======
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add global function to window for console access
      window.getResume = () => {
        triggerBackdoor('Console Command');
      };
    }
  }, []);

  // ====== METHOD 3: LOGO CLICKS ======
  useEffect(() => {
    const handleLogoClick = (e) => {
      // Prevent normal navigation
      e.preventDefault();
      
      setLogoClickCount(prev => {
        const newCount = prev + 1;
        if (newCount === REQUIRED_LOGO_CLICKS) {
          triggerBackdoor('Logo Clicks');
          return 0;
        }
        
        // Show progress hint
        if (newCount > 0) {
          console.log(`Logo clicks: ${newCount}/${REQUIRED_LOGO_CLICKS}`);
        }
        
        return newCount;
      });
    };

    // Add click listener to logo (first nav link)
    const logo = document.querySelector('nav a');
    if (logo) {
      logo.addEventListener('click', handleLogoClick);
      return () => logo.removeEventListener('click', handleLogoClick);
    }
  }, []);

  // ====== METHOD 4: MOVING DOT ======
  useEffect(() => {
    const moveDot = () => {
      setDotPosition({
        x: Math.random() * 90 + 5, // 5% to 95%
        y: Math.random() * 90 + 5
      });
    };

    // Move at moderate speed - every 2 seconds
    const interval = setInterval(moveDot, 2000);
    return () => clearInterval(interval);
  }, []);

  // ====== MAIN TRIGGER FUNCTION ======
  const triggerBackdoor = (method) => {
    console.log(`🎉 Backdoor activated via: ${method}`);
    setIsTriggered(true);
    setShowModal(true);
  };

  // ====== KEYBOARD LISTENER ======
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ====== HANDLERS ======
  const handleDownloadResume = () => {
    if (RESUME_LINK.includes('your-resume-id')) {
      alert('Resume link not configured yet! Please update RESUME_LINK in BackdoorEasterEgg.jsx');
    } else {
      window.open(RESUME_LINK, '_blank');
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* ====== HIDDEN MOVING DOT ====== */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-white rounded-full opacity-20 cursor-pointer z-10 hover:opacity-100 hover:scale-200 transition-all duration-200"
        style={{
          left: `${dotPosition.x}%`,
          top: `${dotPosition.y}%`,
          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))',
        }}
        animate={{
          x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
          y: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 0.7, 0.2]
        }}
        transition={{
          x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={() => triggerBackdoor('Hidden Dot')}
        title="⚪ Secret dot found!"
      />

      {/* ====== PROGRESS INDICATORS ====== */}
      {logoClickCount > 0 && logoClickCount < REQUIRED_LOGO_CLICKS && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-20 right-4 z-50 bg-green-500/90 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
        >
          🎯 Logo clicks: {logoClickCount}/{REQUIRED_LOGO_CLICKS}
        </motion.div>
      )}

      {/* ====== SUCCESS MODAL ====== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[999999] p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0, rotate: 180, y: -100 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                duration: 0.6
              }}
              className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl p-8 max-w-lg w-full border-2 border-white/20 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20"
              >
                <X size={16} className="text-white" />
              </button>

              <div className="text-center">
                {/* Crown Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    scale: { delay: 0.3, type: "spring", stiffness: 200 },
                    y: { delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="mx-auto w-24 h-24 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center mb-6 shadow-xl border-2 border-white/30"
                >
                  <Crown size={40} className="text-black" />
                </motion.div>

                {/* Success Message */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3"
                >
                  <Sparkles className="text-white animate-pulse" />
                  Backdoor Found!
                  <Sparkles className="text-white animate-pulse" />
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-300 mb-8 text-lg leading-relaxed"
                >
                  🎉 <strong className="text-white">Congratulations, Detective!</strong><br/>
                  You discovered one of my secret backdoors.<br/>
                  Here's your reward - my resume!
                </motion.p>

                {/* Download Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadResume}
                  className="w-full bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-white text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl mb-6 border border-white/20"
                >
                  <Download size={24} />
                  Download My Resume
                </motion.button>

                {/* Achievement Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="bg-gradient-to-r from-white/10 to-gray-200/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm"
                >
                  <p className="text-white font-semibold text-lg mb-2">🏆 Achievement Unlocked!</p>
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Secret Detective</strong><br/>
                    Successfully found hidden easter egg
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== RANDOM HINT SYSTEM ====== */}
      {/* Hints removed - no notifications */}
    </>
  );
};

export default BackdoorEasterEgg;