import { useEffect, useRef, useState, useCallback } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const exitCalledRef = useRef(false);
  const [isExiting, setIsExiting] = useState(false);
  const [fastForward, setFastForward] = useState(false);

  const triggerExit = useCallback(() => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;
    setIsExiting(true);
    // Wait for the CSS transition on #overlay or just fade out the whole component
    setTimeout(() => {
      onComplete?.();
    }, 1100);
  }, [onComplete]);

  // Main timer for auto-exit at 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerExit();
    }, 5000);
    return () => clearTimeout(timer);
  }, [triggerExit]);

  // Canvas particle logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    let animationFrameId;

    function resize() {
      W = canvas.width = stage.offsetWidth;
      H = canvas.height = stage.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const GOLD = 'rgba(201,168,76,';

    class Particle {
      constructor() { this.reset(true); }
      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 1.8 + 0.4;
        this.alpha = Math.random() * 0.6 + 0.1;
        this.life = Math.random() * 300 + 150;
        this.maxLife = this.life;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life--;
        if (this.life <= 0 || this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) this.reset(false);
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + (this.alpha * (this.life / this.maxLife)) + ')';
        ctx.fill();
      }
    }

    for (let i = 0; i < 90; i++) particles.push(new Particle());

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      // Grid
      const gs = 70;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = GOLD + '0.04)';
      for (let x = 0; x <= W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y <= H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Grid dot intersections
      for (let x = 0; x <= W; x += gs) {
        for (let y = 0; y <= H; y += gs) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = GOLD + '0.12)'; ctx.fill();
        }
      }

      // Particles
      particles.forEach(p => { p.update(); p.draw(); });

      // Particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = GOLD + (0.07 * (1 - d / 90)) + ')';
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    }
    drawFrame();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSkip = () => {
    setFastForward(true);
    triggerExit();
  };

  return (
    <div
      id="bhstage"
      ref={stageRef}
      className={`${fastForward ? 'fast-forward' : ''} ${isExiting ? 'exiting' : ''}`}
      style={{ zIndex: 9999, position: 'fixed', inset: 0 }}
    >
      <canvas id="grid" ref={canvasRef}></canvas>
      <div className="glow-ring"></div>
      <div className="glow-ring"></div>
      <div className="glow-ring"></div>
      <div className="corner-deco tl"></div>
      <div className="corner-deco tr"></div>
      <div className="corner-deco bl"></div>
      <div className="corner-deco br"></div>

      <div id="skip" onClick={handleSkip}>Skip ↗</div>

      <div id="content">
        <div id="bh-logo">BH GROUP</div>
        <div id="bh-line"></div>
        <div id="company-name">Consulting &amp; Sourcing</div>
        <div id="company-sub">(OPC) Private Limited &nbsp;·&nbsp; Est. 2000</div>
        <div id="tagline">"Empowering Youth &nbsp;·&nbsp; Engineering Excellence &nbsp;·&nbsp; Enabling Growth"</div>
        <div id="verticals">
          <span className="vtag">Engineering</span>
          <span className="vtag">Sourcing</span>
          <span className="vtag">Education</span>
          <span className="vtag">Training</span>
          <span className="vtag">Consulting</span>
        </div>
      </div>

      <div id="est">Since 2000 &nbsp;·&nbsp; Pune, India</div>
    </div>
  );
}
