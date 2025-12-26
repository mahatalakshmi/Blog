import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagicalBackground() {
  const [stars, setStars] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(newStars);

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep magical gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1033] to-[#0d0d1f]" />
      
      {/* Mystical aurora effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-700 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-800 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating magical particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%)`,
          }}
          animate={{
            y: [window.innerHeight + 50, -50],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" 
           style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />
    </div>
  );
}