import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const particles = particlesRef?.current;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      particles.length = 0;
      const particleCount = Math.floor((canvas?.width * canvas?.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        particles?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          pulse: Math.random() * Math.PI * 2
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      particles?.forEach((particle, index) => {
        // Update position
        particle.x += particle?.vx;
        particle.y += particle?.vy;
        particle.pulse += 0.02;

        // Wrap around edges
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.y < 0) particle.y = canvas?.height;
        if (particle?.y > canvas?.height) particle.y = 0;

        // Pulsing opacity
        const currentOpacity = particle?.opacity * (0.5 + 0.5 * Math.sin(particle?.pulse));

        // Draw particle
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${currentOpacity})`;
        ctx?.fill();

        // Draw connections
        particles?.slice(index + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const connectionOpacity = (1 - distance / 100) * 0.1;
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${connectionOpacity})`;
            ctx.lineWidth = 0.5;
            ctx?.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: -1 }}
    />
  );
};

export default ParticleBackground;