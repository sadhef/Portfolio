"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { webApplications, mobileApps } from '../constants';
import ProjectRow from './ProjectRow';
import ProjectModal from './ProjectModal';

const Works = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter out any null/undefined projects
  const validWebApps = webApplications?.filter(p => p != null) || [];
  const validMobileApps = mobileApps?.filter(p => p != null) || [];

  // Control navbar visibility and body scroll when modal opens/closes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navbar = document.querySelector('nav[role="navigation"]');
    const body = document.body;
    const html = document.documentElement;

    if (isModalOpen) {
      // Hide navbar when modal is open
      if (navbar) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease-in-out';
        navbar.style.zIndex = '999'; // Lower than modal
      }
      
      // Prevent body scroll when modal is open
      body.style.overflow = 'hidden';
      body.style.height = '100vh';
      html.style.overflow = 'hidden';
      
      // Add modal-open class to body
      body.classList.add('modal-open');
      
      // Hide other sections behind modal
      const sections = document.querySelectorAll('section, div[id]');
      sections.forEach(section => {
        if (!section.closest('.modal-container')) {
          section.style.zIndex = '1';
        }
      });
      
    } else {
      // Show navbar when modal is closed
      if (navbar) {
        navbar.style.transform = 'translateY(0px)';
        navbar.style.zIndex = '1000';
      }
      
      // Restore body scroll
      body.style.overflow = 'unset';
      body.style.height = 'auto';
      html.style.overflow = 'unset';
      
      // Remove modal-open class
      body.classList.remove('modal-open');
      
      // Restore section z-indexes
      const sections = document.querySelectorAll('section, div[id]');
      sections.forEach(section => {
        section.style.zIndex = '';
      });
    }

    // Cleanup function to ensure navbar is visible and scroll is restored
    return () => {
      if (navbar) {
        navbar.style.transform = 'translateY(0px)';
        navbar.style.zIndex = '1000';
      }
      body.style.overflow = 'unset';
      body.style.height = 'auto';
      html.style.overflow = 'unset';
      body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Add a small delay before clearing the project to allow for exit animation
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  return (
    <div ref={ref} className="bg-primary min-h-screen py-20 relative">
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
          Showcasing my expertise in full-stack development through web applications and mobile apps.
          Each project demonstrates different aspects of modern development including MERN stack, 
          AI integration, and cross-platform mobile development. Click on any project to explore 
          detailed features, technologies used, and live demonstrations.
        </motion.p>
      </div>

      {/* Web Applications Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {validWebApps.length > 0 && (
          <ProjectRow
            title="Web Applications"
            projects={validWebApps}
            onSelectProject={handleSelectProject}
          />
        )}
      </motion.div>

      {/* Mobile Apps Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8"
      >
        {validMobileApps.length > 0 && (
          <ProjectRow
            title="Mobile Apps"
            projects={validMobileApps}
            onSelectProject={handleSelectProject}
          />
        )}
      </motion.div>

      {/* Project Modal with highest z-index */}
      {(isModalOpen || selectedProject) && (
        <div className="modal-container">
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      )}

      {/* Global Modal Styles */}
      <style jsx global>{`
        /* Hide scrollbars for project rows */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Modal specific styles */
        .modal-open {
          overflow: hidden !important;
          height: 100vh !important;
        }
        
        .modal-open body {
          overflow: hidden !important;
          height: 100vh !important;
        }
        
        /* Ensure modal container has highest z-index */
        .modal-container {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 999999 !important;
          pointer-events: none;
        }
        
        .modal-container > * {
          pointer-events: auto;
        }
        
        /* Lower z-index for other content when modal is open */
        body.modal-open section:not(.modal-container),
        body.modal-open div[id]:not(.modal-container),
        body.modal-open nav {
          z-index: 1 !important;
        }
        
        /* Ensure contact form stays below modal */
        body.modal-open .contact-section,
        body.modal-open .contact-form-container {
          z-index: 1 !important;
        }

        /* Web Applications Section Styling */
        .web-apps-section {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
          border-radius: 20px;
          padding: 20px 0;
          margin: 20px 0;
        }

        /* Mobile Apps Section Styling */
        .mobile-apps-section {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
          border-radius: 20px;
          padding: 20px 0;
          margin: 20px 0;
        }

        /* Project category badges */
        .project-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .web-app-badge {
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          color: white;
        }

        .mobile-app-badge {
          background: linear-gradient(135deg, #10B981, #8B5CF6);
          color: white;
        }

        /* Enhanced hover effects for project sections */
        .project-section:hover .project-category-badge {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        /* Responsive design improvements */
        @media (max-width: 768px) {
          .project-section {
            margin: 16px 0;
            padding: 16px 0;
          }
          
          .project-category-badge {
            font-size: 12px;
            padding: 6px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Works, "projects");