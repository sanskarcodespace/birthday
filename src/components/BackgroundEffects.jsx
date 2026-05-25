import React, { useEffect, useRef, useState } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Mouse tracking for cursor glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Heart drawing helper
    const drawHeart = (ctx, x, y, size, opacity, color) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.scale(size / 30, size / 30);
      ctx.moveTo(0, -10);
      
      // Heart shape math curves
      ctx.bezierCurveTo(5, -25, 25, -20, 25, 0);
      ctx.bezierCurveTo(25, 15, 0, 30, 0, 40);
      ctx.bezierCurveTo(0, 30, -25, 15, -25, 0);
      ctx.bezierCurveTo(-25, -20, -5, -25, 0, -10);
      
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ec4899';
      ctx.fill();
      ctx.restore();
    };

    // Particles system
    const particles = [];
    const maxParticles = 60; // Sweet spot for performance and density

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 8 + 6; // Size of hearts
        this.speedY = Math.random() * 0.8 + 0.3; // Speed floating upwards
        this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.2; // Gentle side wave
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '#ec4899' : '#a855f7'; // Pink or purple
        this.wobble = Math.random() * 100;
        this.wobbleSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.y -= this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.4;

        // Reset if offscreen
        if (this.y < -50) {
          this.reset();
        }
      }

      draw() {
        drawHeart(ctx, this.x, this.y, this.size, this.opacity, this.color);
      }
    }

    // Star background particles (twinkling)
    const stars = [];
    const starCount = 80;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        angle: Math.random() * Math.PI
      });
    }

    // Initialize floating hearts
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
      // Stagger initial Y heights so they don't all rise together
      particles[i].y = Math.random() * canvas.height;
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Twinkling Stars
      stars.forEach(star => {
        star.angle += star.twinkleSpeed;
        const opacity = star.baseOpacity + Math.sin(star.angle) * 0.2;
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = Math.max(0.1, Math.min(1, opacity));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and Draw floating hearts
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* HTML Canvas for background heart and star particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #100520 0%, #05010b 100%)' }}
      />
      
      {/* Real-time Cursor Glow Effect */}
      {isVisible && (
        <div
          className="cursor-glow hidden md:block"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </>
  );
}
