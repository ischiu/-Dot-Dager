import { useEffect, useRef, useState } from 'preact/hooks';

const SnowAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const snowflakesRef = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);

  class Snowflake {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = 0;
      this.size = Math.random() * 3 + 2;
      this.speed = Math.random() * 1 + 0.5;
      this.wind = Math.random() * 0.5 - 0.25;
      this.active = true;
    }

    update() {
      this.y += this.speed;
      this.x += this.wind;

      if (this.y > this.canvas.height) {
        if (isPlaying) {
          this.reset();
        } else {
          this.active = false;
        }
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = document.documentElement.classList.contains('dark') 
        ? '#94a3b8'
        : '#1e293b';
      ctx.fill();
      ctx.closePath();
    }
  }

  useEffect(() => {
    const handleAudioStateChange = (event) => {
      setIsPlaying(event.detail.isPlaying);
    };

    document.addEventListener('audioStateChanged', handleAudioStateChange);

    return () => {
      document.removeEventListener('audioStateChanged', handleAudioStateChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const numberOfSnowflakes = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      if (!canvas.isConnected) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isPlaying && snowflakesRef.current.length === 0) {
        for (let i = 0; i < numberOfSnowflakes; i++) {
          snowflakesRef.current.push(new Snowflake(canvas));
        }
      }
      snowflakesRef.current = snowflakesRef.current.filter(snowflake => {
        if (snowflake.active) {
          snowflake.update();
          snowflake.draw(ctx);
          return true;
        }
        return false;
      });
      if (snowflakesRef.current.length > 0 || isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      snowflakesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      snowflakesRef.current = [];
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none"
    />
  );
};

export default SnowAnimation;