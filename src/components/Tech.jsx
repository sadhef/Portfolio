import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

import { styles } from "../styles";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const Tech = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();

  // Intersection Observer for triggering animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Store the current ref value to use in cleanup
    const currentRef = sectionRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Proper cleanup with stored ref value
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect(); // Always disconnect to be safe
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced stagger for faster appearance
        delayChildren: 0.1     // Minimal delay
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20,           // Reduced movement
      opacity: 0,
      scale: 0.9       // Less dramatic scale
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,  // Faster spring
        damping: 15,     // Less bouncy
        duration: 0.3    // Shorter duration
      }
    }
  };

  return (
    <div ref={sectionRef} className="flex flex-col items-center">
      {/* Section Header */}
      <motion.div
        variants={textVariant()}
        initial="hidden"
        animate={controls}
        className="text-center mb-10"
      >
        <p className={`${styles.sectionSubText}`}>Technologies I work with</p>
        <h2 className={`${styles.sectionHeadText}`}>Skills.</h2>
      </motion.div>

      {/* Technology Icons Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-row flex-wrap justify-center gap-10 max-w-5xl"
      >
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            variants={itemVariants}
            className="w-28 h-28 flex flex-col items-center justify-center group"
            whileHover={{ 
              scale: 1.1,
              y: -10,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Technology Icon Container */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center mb-2 group-hover:border-blue-500 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
              <div className="relative w-12 h-12">
                <Image
                  src={technology.icon}
                  alt={technology.name}
                  fill
                  sizes="48px"
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Technology Name */}
            <span className="text-white text-sm font-medium text-center group-hover:text-blue-400 transition-colors duration-300">
              {technology.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");