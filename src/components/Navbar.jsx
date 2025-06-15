"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";

// Loading indicator component for scroll effect - SPINNER ONLY
const ScrollLoadingIndicator = memo(({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute right-4 top-1/2 transform -translate-y-1/2"
    >
      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
    </motion.div>
  );
});

ScrollLoadingIndicator.displayName = "ScrollLoadingIndicator";

// Scroll Progress Component
const ScrollProgress = memo(({ className = "" }) => {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`absolute bottom-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-10 ${className}`}
      style={{ scaleX }}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";

const NavItem = memo(({ nav, active, setActive, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.1 * index, 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <motion.li
      key={nav.id}
      custom={index}
      variants={itemVariants}
      className={`${
        active === nav.title ? "text-white" : "text-secondary"
      } hover:text-white text-[18px] font-light cursor-pointer transition-colors duration-300`}
      onClick={() => setActive(nav.title)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActive(nav.title);
          document.getElementById(nav.id)?.scrollIntoView({ behavior: "smooth" });
        }
      }}
      role="menuitem"
      aria-current={active === nav.title ? "page" : undefined}
    >
      <a href={`#${nav.id}`} className="relative inline-block py-2" aria-label={nav.title}>
        <span>{nav.title}</span>
        {active === nav.title && (
          <motion.span 
            layoutId="underline" 
            className="absolute left-0 top-full block h-[2px] w-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </a>
    </motion.li>
  );
});

NavItem.displayName = "NavItem";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // SIMPLE scroll handler - ONLY changes background, NEVER hides navbar
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const currentScrollPos = window.scrollY;
    
    // Show loading indicator when scrolling
    setIsScrolling(true);
    
    // ONLY handle navbar background transition - NO HIDING
    setScrolled(currentScrollPos > 100);
    
    // Clear loading indicator after scroll stops
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
    
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set initial state based on URL hash if present
    const hash = window.location.hash;
    if (hash) {
      const item = navLinks.find((nav) => `#${nav.id}` === hash);
      if (item) setActive(item.title);
    }

    // Add scroll event listener with throttling for better performance
    let ticking = false;
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", optimizedScrollHandler);
      clearTimeout(window.scrollTimeout);
    };
  }, [handleScroll]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggle && !event.target.closest('#mobile-menu') && !event.target.closest('[aria-controls="mobile-menu"]')) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggle]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled 
          ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10" 
          : "bg-transparent"
      }`}
      style={{ 
        transform: 'translateY(0px)', // FORCE NAVBAR TO ALWAYS BE VISIBLE
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0'
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Mohammed Sadhef, back to top"
        >
          <motion.p 
            className="text-white text-[18px] font-medium cursor-pointer tracking-wider group-hover:text-blue-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-light">Mohammed</span>&nbsp;
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sadhef
            </span>
          </motion.p>
        </Link>

        {/* Desktop Navigation */}
        <motion.ul
          role="menubar"
          className="list-none hidden sm:flex flex-row gap-10"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
          }}
        >
          {navLinks.map((nav, index) => (
            <NavItem key={nav.id} nav={nav} active={active} setActive={setActive} index={index} />
          ))}
        </motion.ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <motion.button
            aria-expanded={toggle}
            aria-controls="mobile-menu"
            aria-label={toggle ? "Close menu" : "Open menu"}
            className="w-8 h-8 cursor-pointer flex flex-col justify-center gap-1.5 items-end relative z-50"
            onClick={() => setToggle(!toggle)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setToggle(!toggle);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className="h-0.5 bg-white origin-center"
              animate={{
                width: toggle ? "24px" : "24px",
                rotate: toggle ? 45 : 0,
                y: toggle ? 8 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.div 
              className="h-0.5 bg-white"
              animate={{
                width: toggle ? "0px" : "16px",
                opacity: toggle ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.div 
              className="h-0.5 bg-white origin-center"
              animate={{
                width: toggle ? "24px" : "20px",
                rotate: toggle ? -45 : 0,
                y: toggle ? -8 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {toggle && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-16 right-0 mx-4 my-2 min-w-[200px] z-40 bg-black/90 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden"
              >
                <motion.ul 
                  role="menu" 
                  className="flex flex-col"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                >
                  {navLinks.map((nav, index) => (
                    <motion.li
                      key={nav.id}
                      role="menuitem"
                      className={`font-poppins font-light cursor-pointer text-[16px] transition-colors duration-300 ${
                        active === nav.title ? "text-white" : "text-gray-300"
                      }`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setToggle(false);
                          setActive(nav.title);
                          document.getElementById(nav.id)?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      variants={{
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            y: { stiffness: 1000, velocity: -100 }
                          }
                        },
                        closed: {
                          y: 50,
                          opacity: 0,
                          transition: {
                            y: { stiffness: 1000 }
                          }
                        }
                      }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a href={`#${nav.id}`} className="block py-3 px-6 hover:bg-white/10 transition-colors duration-300">
                        {nav.title}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading Indicator */}
        <AnimatePresence>
          <ScrollLoadingIndicator isLoading={isScrolling} />
        </AnimatePresence>
      </div>
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
    </nav>
  );
};

export default Navbar;