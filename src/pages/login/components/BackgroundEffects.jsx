import React, { useEffect, useRef } from 'react';

const BackgroundEffects = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      if (particlesRef?.current) {
        particlesRef?.current?.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle?.parentNode) {
            particle?.parentNode?.removeChild(particle);
          }
        }, 5000);
      }
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 100);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 500);

    return () => {
      clearInterval(interval);
      if (particlesRef?.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-surface/50" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" 
             style={{ 
               backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.1) 50%, transparent 100%)`,
               backgroundSize: '200px 100%',
               animation: 'slideRight 8s infinite linear'
             }} />
      </div>
      
      {/* Particles Container */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/20 to-transparent rounded-tl-full" />
      
      {/* Neon Lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
      `}</style>
    </>
  );
};

export default BackgroundEffects;