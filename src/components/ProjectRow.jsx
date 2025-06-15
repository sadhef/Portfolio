import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const ProjectRow = ({ title, projects, onSelectProject }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.offsetWidth - 100;
      if (direction === 'left') {
        rowRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScrollCheck = () => {
      if (rowRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    const currentRef = rowRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScrollCheck);
      handleScrollCheck();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScrollCheck);
      }
    };
  }, [projects]);

  if (!projects || projects.length === 0) return null;

  return (
    <div className="mb-8 group">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 px-4 md:px-12 hover:text-gray-300 transition-colors cursor-pointer">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Scroll left"
          >
            <ChevronLeft size={40} className="text-white" />
          </button>
        )}
        
        {/* Project Cards Container */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-12 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => {
            // Extra safety check and logging
            if (!project) {
              console.warn('Project at index', index, 'is null or undefined');
              return null;
            }
            
            const projectName = project.name || `Project ${index + 1}`;
            const uniqueKey = `${projectName}-${index}`;
            
            return (
              <ProjectCard
                key={uniqueKey}
                project={project}
                onSelect={onSelectProject}
              />
            );
          })}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Scroll right"
          >
            <ChevronRight size={40} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectRow;