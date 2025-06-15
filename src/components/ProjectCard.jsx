import React, { useState } from 'react';
import Image from "next/image";
import { Plus, ExternalLink, ChevronDown, Github, Eye } from 'lucide-react';

const ProjectCard = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!project) return null;

  const { 
    name = 'Untitled Project', 
    description = 'No description available', 
    image, 
    tags = [], 
    source_code_link
  } = project;
  
  const matchPercent = Math.round(Math.random() * 20 + 80);
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="relative flex-none transition-all duration-300 cursor-pointer"
      style={{ width: isHovered ? '320px' : '200px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect && onSelect(project)}
    >
      <div className="relative w-full">
        <div className="relative w-full h-[300px]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded"
            loading="lazy"
          />
        </div>
        
        {/* Hover Content */}
        {isHovered && (
          <div className="absolute inset-0 bg-[#181818] rounded shadow-2xl overflow-hidden z-20">
            <div className="relative">
              <div className="relative w-full h-[180px]">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-2">
                  <button 
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (source_code_link) {
                        window.open(source_code_link, '_blank');
                      }
                    }}
                    title="View Live Demo"
                  >
                    <Eye size={16} className="text-black" />
                  </button>
                  
                  <button 
                    className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition group"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (source_code_link) {
                        window.open(source_code_link, '_blank');
                      }
                    }}
                    title="View Source Code"
                  >
                    <Github size={16} className="text-gray-400 group-hover:text-white" />
                  </button>
                  
                  <button 
                    className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition group"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Add to favorites:', name);
                    }}
                    title="Add to Favorites"
                  >
                    <Plus size={18} className="text-gray-400 group-hover:text-white" />
                  </button>
                </div>
                
                <button 
                  className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect && onSelect(project);
                  }}
                  title="More Info"
                >
                  <ChevronDown size={18} className="text-gray-400 group-hover:text-white" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500 font-semibold">{matchPercent}% Match</span>
                  <span className="text-gray-400">{currentYear}</span>
                  <span className="border border-gray-400 px-1.5 py-0.5 text-xs text-gray-400">
                    {tags[0]?.name || 'Project'}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-xs border border-gray-400 px-1 py-0.5 text-gray-400 rounded">
                    {tags.length > 1 ? 'Full Stack' : 'Frontend'}
                  </span>
                  {source_code_link && (
                    <span className="text-xs border border-gray-400 px-1 py-0.5 text-gray-400 rounded">Live</span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs text-gray-400">
                      {tag.name}{index < Math.min(2, tags.length - 1) && ' •'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;