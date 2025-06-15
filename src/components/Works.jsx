"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import ProjectRow from './ProjectRow';
import ProjectModal from './ProjectModal';

const Works = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debug: Log projects to see structure
  console.log('All projects:', projects);
  console.log('Projects length:', projects?.length);

  // Filter out any null/undefined projects
  const validProjects = projects?.filter(p => p != null) || [];

  console.log('Valid projects count:', validProjects.length);

  // Control navbar visibility when modal opens/closes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navbar = document.querySelector('nav[role="navigation"]');
    if (!navbar) return;

    if (isModalOpen) {
      // Hide navbar when modal is open
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.3s ease-in-out';
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Show navbar when modal is closed
      navbar.style.transform = 'translateY(0px)';
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure navbar is visible and scroll is restored
    return () => {
      if (navbar) {
        navbar.style.transform = 'translateY(0px)';
      }
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div ref={ref} className="bg-primary min-h-screen py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`${styles.sectionSubText} text-center`}
        >
          My work
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${styles.sectionHeadText} text-center`}
        >
          Projects.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] mx-auto text-center px-4 sm:px-0"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. Hover over cards to see detailed information
          and click to explore the full project breakdown.
        </motion.p>
      </div>

      {/* Single Project Row - All Projects */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {validProjects.length > 0 && (
          <ProjectRow
            title="All Projects"
            projects={validProjects}
            onSelectProject={handleSelectProject}
          />
        )}
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Works, "projects");