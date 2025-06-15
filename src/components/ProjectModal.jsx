import React, { useEffect, useCallback, useMemo, memo } from 'react';
import Image from "next/image";
import { X, Github, ExternalLink, Calendar, Code } from 'lucide-react';

// Memoized action button component
const ActionButton = memo(({ onClick, className, children, icon: Icon }) => (
  <button onClick={onClick} className={className}>
    <Icon size={22} />
    {children}
  </button>
));
ActionButton.displayName = 'ActionButton';

// Memoized feature item component
const FeatureItem = memo(({ feature, index }) => (
  <div 
    className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <span className="text-green-400 mt-1 text-2xl flex-shrink-0">✓</span>
    <span className="text-gray-300 text-lg">{feature}</span>
  </div>
));
FeatureItem.displayName = 'FeatureItem';

// Memoized technology tag component
const TechTag = memo(({ tag, index }) => {
  const tagColorClass = useMemo(() => {
    const colorMap = {
      'blue-text-gradient': 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20',
      'green-text-gradient': 'bg-green-500/10 text-green-300 border-green-500/30 hover:bg-green-500/20',
      'pink-text-gradient': 'bg-pink-500/10 text-pink-300 border-pink-500/30 hover:bg-pink-500/20',
      'yellow-text-gradient': 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/20',
      'orange-text-gradient': 'bg-orange-500/10 text-orange-300 border-orange-500/30 hover:bg-orange-500/20',
      'purple-text-gradient': 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20',
    };
    return colorMap[tag.color] || 'bg-gray-500/10 text-gray-300 border-gray-500/30 hover:bg-gray-500/20';
  }, [tag.color]);

  return (
    <span
      className={`px-6 py-3 rounded-full text-lg font-semibold border-2 transition-all duration-200 hover:scale-105 ${tagColorClass}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {tag.name}
    </span>
  );
});
TechTag.displayName = 'TechTag';

const ProjectModal = memo(({ project, onClose, isOpen }) => {
  // Memoized close handler
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Memoized escape key handler
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      handleClose();
    }
  }, [isOpen, handleClose]);

  // Memoized backdrop click handler
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // Effect for keyboard and body scroll management
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  // Memoized project data extraction
  const projectData = useMemo(() => {
    if (!project) return null;

    const {
      name = 'Untitled Project',
      description = 'No description available',
      image,
      tags = [],
      source_code_link
    } = project;

    const year = new Date().getFullYear();

    return { name, description, image, tags, source_code_link, year };
  }, [project]);

  // Memoized features extraction
  const features = useMemo(() => {
    if (!projectData?.description) return [];

    const desc = projectData.description;
    
    if (desc.includes('Features include')) {
      const featuresText = desc.split('Features include')[1];
      return featuresText.split('.')[0].split(',').map(f => f.trim()).filter(f => f.length > 0);
    }

    // Generate features based on description content
    const detectedFeatures = [];
    const featureMap = {
      'authentication': 'Secure user authentication',
      'real-time': 'Real-time functionality',
      'responsive': 'Responsive design',
      'API': 'External API integration',
      'booking': 'Real-time booking management',
      'payments': 'Payment processing',
      'Razorpay': 'Razorpay payment integration',
      'Redux': 'State management with Redux',
      'multilingual': 'Multilingual support',
      'voice-controlled': 'Voice-controlled instructions',
      'admin': 'Admin dashboard',
      'timed challenges': 'Timed challenge system',
      'community chat': 'Community chat system',
      'offline mode': 'Offline mode support',
      'cloud dashboard': 'Cloud monitoring dashboard',
      'video': 'Video consultation system',
      'telemedicine': 'Telemedicine platform',
      'HIPAA': 'HIPAA-compliant security',
      'Docker': 'Containerized deployment',
      'Kubernetes': 'Kubernetes orchestration',
      'MongoDB': 'Database management',
      'Vite': 'Fast build tool',
      'Bootstrap': 'Responsive UI framework'
    };

    Object.entries(featureMap).forEach(([key, value]) => {
      if (desc.includes(key) && !detectedFeatures.includes(value)) {
        detectedFeatures.push(value);
      }
    });

    return detectedFeatures.length > 0 
      ? detectedFeatures 
      : ['Modern user interface', 'Cross-platform compatibility', 'Optimized performance'];
  }, [projectData?.description]);

  // Memoized button handlers
  const handleDemoClick = useCallback(() => {
    if (projectData?.source_code_link) {
      window.open(projectData.source_code_link, '_blank');
    }
  }, [projectData?.source_code_link]);

  // Early return for better performance
  if (!isOpen || !projectData) return null;

  const { name, description, image, tags, source_code_link, year } = projectData;

  return (
    <div 
      className="fixed inset-0 flex items-start justify-center pt-4 pb-4"
      style={{ 
        zIndex: 2147483647,  // Maximum z-index value
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'auto'
      }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90" 
        style={{ zIndex: 2147483646 }}
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-[#0a0a0a] rounded-2xl max-w-6xl w-full mx-4 max-h-[96vh] overflow-hidden border border-gray-800 shadow-2xl"
        style={{ zIndex: 2147483647 }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors duration-200 group"
          aria-label="Close modal"
          style={{ zIndex: 2147483647 }}
        >
          <X size={24} className="text-white group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Scrollable content */}
        <div className="max-h-[96vh] overflow-y-auto will-change-scroll">
          {/* Hero Image */}
          <div className="relative h-72 md:h-96">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 75vw"
              className="object-cover"
              priority
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />
            
            {/* Title and Actions Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight will-change-transform">
                {name}
              </h1>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {source_code_link && (
                  <ActionButton
                    onClick={handleDemoClick}
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-bold text-lg shadow-lg"
                    icon={ExternalLink}
                  >
                    View Live
                  </ActionButton>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Project Stats */}
            <div className="flex flex-wrap items-center gap-8 text-lg text-gray-400 mb-10 pb-8 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Calendar size={22} />
                <span className="font-medium">{year}</span>
              </div>
              <div className="flex items-center gap-3">
                <Code size={22} />
                <span className="font-medium">{tags.length || 0} Technologies</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Description */}
                <div>
                  <h3 className="text-white text-3xl font-bold mb-6">
                    About This Project
                  </h3>
                  <p className="text-gray-300 text-xl leading-relaxed">{description}</p>
                </div>

                {/* Features */}
                {features.length > 0 && (
                  <div>
                    <h3 className="text-white text-3xl font-bold mb-6">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} index={index} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h3 className="text-white text-3xl font-bold mb-6">Technologies Used</h3>
                  <div className="flex flex-wrap gap-4">
                    {tags.map((tag, index) => (
                      <TechTag key={index} tag={tag} index={index} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Links */}
                <div className="bg-gray-900/70 rounded-2xl p-8 border border-gray-800">
                  <h4 className="text-white font-bold text-2xl mb-6">Quick Links</h4>
                  <div className="space-y-4">
                    {source_code_link && (
                      <a
                        href={source_code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-200 text-xl p-4 rounded-xl hover:bg-gray-800/50 group"
                      >
                        <ExternalLink size={24} className="group-hover:scale-110 transition-transform" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="bg-gray-900/70 rounded-2xl p-8 border border-gray-800">
                  <h4 className="text-white font-bold text-2xl mb-6">Project Details</h4>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-lg">Category</span>
                      <span className="text-white font-semibold text-lg">{tags[0]?.name || 'Web App'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-lg">Status</span>
                      <span className="text-green-400 font-semibold text-lg flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Live
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-lg">Year</span>
                      <span className="text-white font-semibold text-lg">{year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .will-change-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .will-change-scroll::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        .will-change-scroll::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 4px;
        }
        .will-change-scroll::-webkit-scrollbar-thumb:hover {
          background: #606060;
        }
      `}</style>
    </div>
  );
});

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;