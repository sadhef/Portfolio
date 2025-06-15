"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Professional services data
const services = [
  {
    title: "Frontend Development",
    description: "Modern, responsive web applications using React, Next.js, and cutting-edge technologies.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend Development", 
    description: "Scalable server-side solutions with Node.js, Express, and robust database management.",
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"]
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications with React Native and seamless user experiences.",
    technologies: ["React Native", "Expo", "Android"]
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent solutions integrating Python-based AI, ML models, and data science capabilities.",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Data Analysis"]
  }
];

// Skills data
const skills = [
  { name: "JavaScript", level: 95 },
  { name: "React/Next.js", level: 92 },
  { name: "Node.js", level: 88 },
  { name: "Python", level: 85 },
  { name: "MongoDB", level: 90 },
  { name: "PostgreSQL", level: 82 },
  { name: "React Native", level: 80 },
  { name: "Docker", level: 75 }
];

const ServiceCard = React.memo(({ index, title, description, technologies }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    const currentRef = cardRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full sm:w-[280px] bg-gradient-to-br from-tertiary to-secondary p-[1px] rounded-[20px] shadow-card"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="bg-tertiary rounded-[20px] py-6 px-6 min-h-[280px] flex flex-col justify-between">
        <div>
          <h3 className="text-white text-[18px] font-bold text-center mb-4">
            {title}
          </h3>
          
          <p className="text-secondary text-[14px] text-center leading-relaxed mb-4">
            {description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-black-200 text-white text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});
ServiceCard.displayName = 'ServiceCard';

const SkillBar = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const skillRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    const currentRef = skillRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <motion.div
      ref={skillRef}
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-secondary">{skill.level}%</span>
      </div>
      <div className="w-full bg-tertiary rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      }, 
      { threshold: 0.1, rootMargin: '50px' }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Header Section */}
      <motion.div variants={textVariant()} initial="hidden" animate={isVisible ? "show" : "hidden"}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* Main Description */}
      <motion.p 
        variants={fadeIn("", "", 0.1, 1)} 
        initial="hidden" 
        animate={isVisible ? "show" : "hidden"}
        className="mt-4 text-secondary text-[17px] max-w-4xl leading-[30px]"
      >
        I am a highly motivated Full Stack Developer with extensive experience in dynamic 
        and fast-paced environments. My expertise spans the complete technology stack, 
        from crafting intuitive user interfaces to building robust backend systems. 
        I specialize in the MERN stack (MongoDB, Express.js, React.js, and Node.js) 
        with proficiency in PostgreSQL for relational database management.
      </motion.p>

      <motion.p 
        variants={fadeIn("", "", 0.2, 1)} 
        initial="hidden" 
        animate={isVisible ? "show" : "hidden"}
        className="mt-4 text-secondary text-[17px] max-w-4xl leading-[30px]"
      >
        Beyond traditional web development, I've integrated Python-based data science, 
        AI, and machine learning capabilities into modern applications. My experience 
        with Docker ensures seamless containerization and deployment, while my React Native 
        expertise enables cross-platform mobile development with RESTful APIs and 
        sophisticated state management using Redux and Context API.
      </motion.p>



      {/* Services Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-16"
      >
        <h3 className="text-white text-[24px] font-bold text-center mb-8">
          What I Do
        </h3>
        <div className="flex flex-wrap gap-8 justify-center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </motion.div>

      {/* Skills Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16"
      >
        <h3 className="text-white text-[24px] font-bold text-center mb-8">
          Technical Expertise
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            {skills.slice(0, 4).map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
          <div className="space-y-4">
            {skills.slice(4).map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index + 4} />
            ))}
          </div>
        </div>
      </motion.div>


    </div>
  );
};

export default SectionWrapper(About, "about");