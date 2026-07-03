"use client";

import { useEffect, useRef, type PointerEvent } from "react";

type Point = {
  x: number;
  y: number;
};

type Spot = Point & {
  heat: number;
  size: number;
};

type AudioEngine = {
  context: AudioContext;
  oscillator: OscillatorNode;
  filter: BiquadFilterNode;
  gain: GainNode;
};

const BG = "#e91702";

const MAX_HEAT = 1;
const COOL_SPEED = 0.22;
const EMIT_INTERVAL = 16;
const MAX_SPOTS = 700;

const ENABLE_SOUND = true;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function ThermalFabricPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const spotsRef = useRef<Spot[]>([]);
  const pointerRef = useRef<Point | null>(null);
  const previousPointerRef = useRef<Point | null>(null);

  const isPressingRef = useRef(false);
  const holdStartTimeRef = useRef(0);
  const lastEmitTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  const audioRef = useRef<AudioEngine | null>(null);

  const ensureAudio = () => {
    if (!ENABLE_SOUND || audioRef.current) return;

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = 130;

    filter.type = "lowpass";
    filter.frequency.value = 900;

    gain.gain.value = 0;

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    oscillator.start();

    audioRef.current = {
      context,
      oscillator,
      filter,
      gain,
    };
  };

  const setAudioIntensity = (intensity: number) => {
    const audio = audioRef.current;

    if (!audio || audio.context.state === "closed") return;

    const now = audio.context.currentTime;
    const volume = isPressingRef.current ? intensity * 0.12 : 0;

    audio.gain.gain.setTargetAtTime(volume, now, 0.05);
    audio.oscillator.frequency.setTargetAtTime(
      130 + intensity * 180,
      now,
      0.08,
    );
    audio.filter.frequency.setTargetAtTime(600 + intensity * 900, now, 0.08);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const getCssFont = (variableName: string) => {
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue(variableName)
          .trim() || "Arial, Helvetica, sans-serif"
      );
    };

    const heatMapFont = getCssFont("--font-denton");

    const heatCanvas = document.createElement("canvas");
    const heatCtx = heatCanvas.getContext("2d");

    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");

    if (!heatCtx || !textCtx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      heatCanvas.width = canvas.width;
      heatCanvas.height = canvas.height;

      textCanvas.width = canvas.width;
      textCanvas.height = canvas.height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      heatCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      textCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;

      return {
        dpr,
        width: canvas.width / dpr,
        height: canvas.height / dpr,
      };
    };

    const toRgba = (hex: string, alpha: number) => {
      const normalized = hex.replace("#", "");

      const r = parseInt(normalized.slice(0, 2), 16);
      const g = parseInt(normalized.slice(2, 4), 16);
      const b = parseInt(normalized.slice(4, 6), 16);

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const drawBackground = () => {
      const { width, height } = getCanvasSize();

      ctx.fillStyle = "#d61f10";
      ctx.fillRect(0, 0, width, height);

      const drawBlob = (
        x: number,
        y: number,
        radius: number,
        color: string,
        alpha: number,
      ) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        gradient.addColorStop(0, toRgba(color, alpha));
        gradient.addColorStop(0.5, toRgba(color, alpha * 0.45));
        gradient.addColorStop(1, toRgba(color, 0));

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      };

      drawBlob(width * 0.1, height * 0.08, width * 0.28, "#ef8a40", 0.32);
      drawBlob(width * 0.92, height * 0.04, width * 0.22, "#f1a34a", 0.28);
      drawBlob(width * 0.84, height * 0.78, width * 0.2, "#ee8f45", 0.26);
      drawBlob(width * 0.03, height * 0.98, width * 0.18, "#f0b35a", 0.34);

      drawBlob(width * 0.28, height * 0.2, width * 0.34, "#c81c0f", 0.62);
      drawBlob(width * 0.68, height * 0.3, width * 0.26, "#cf2411", 0.42);
      drawBlob(width * 0.34, height * 0.78, width * 0.38, "#c81c0f", 0.6);
      drawBlob(width * 0.88, height * 0.92, width * 0.16, "#cb2010", 0.34);

      const centerGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.52,
        0,
        width * 0.5,
        height * 0.52,
        width * 0.26,
      );

      centerGlow.addColorStop(0, "rgba(242, 133, 72, 0.16)");
      centerGlow.addColorStop(1, "rgba(242, 133, 72, 0)");

      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);
    };

    const emitHeat = (from: Point, to: Point, holdSeconds: number) => {
      const strength = clamp(0.18 + holdSeconds * 0.55, 0.18, MAX_HEAT);

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(distance / 10));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;

        spotsRef.current.push({
          x: from.x + dx * t + Math.random() * 8 - 4,
          y: from.y + dy * t + Math.random() * 8 - 4,
          heat: strength,
          size: 18 + strength * 34 + Math.random() * 8,
        });
      }

      if (spotsRef.current.length > MAX_SPOTS) {
        spotsRef.current = spotsRef.current.slice(-MAX_SPOTS);
      }
    };

    const hexToRgb = (hex: string) => {
      const normalized = hex.replace("#", "");

      return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16),
      };
    };

    const mix = (start: number, end: number, amount: number) => {
      return Math.round(start + (end - start) * amount);
    };

    const getHeatColor = (heat: number, alpha = 1) => {
      const start = hexToRgb("#e91702");
      const end = hexToRgb("#f4c000");
      const t = clamp(heat, 0, 1);

      const r = mix(start.r, end.r, t);
      const g = mix(start.g, end.g, t);
      const b = mix(start.b, end.b, t);

      return `rgba(${r},${g},${b},${alpha})`;
    };

    const drawSpot = (spot: Spot) => {
      const visualHeat = clamp(spot.heat * 1.45, 0, 1);
      const radius = spot.size * (0.75 + visualHeat * 0.45);

      const gradient = heatCtx.createRadialGradient(
        spot.x,
        spot.y,
        0,
        spot.x,
        spot.y,
        radius,
      );

      gradient.addColorStop(0, getHeatColor(visualHeat, 0.98));
      gradient.addColorStop(0.18, getHeatColor(visualHeat * 0.96, 0.95));
      gradient.addColorStop(0.4, getHeatColor(visualHeat * 0.88, 0.88));
      gradient.addColorStop(0.65, getHeatColor(visualHeat * 0.76, 0.75));
      gradient.addColorStop(0.84, getHeatColor(visualHeat * 0.66, 0.58));
      gradient.addColorStop(1, getHeatColor(visualHeat * 0.52, 0.32));

      heatCtx.fillStyle = gradient;
      heatCtx.beginPath();
      heatCtx.arc(spot.x, spot.y, radius, 0, Math.PI * 2);
      heatCtx.fill();
    };

    const prepareHeatLayer = () => {
      const { dpr } = getCanvasSize();

      heatCtx.setTransform(1, 0, 0, 1, 0, 0);
      heatCtx.clearRect(0, 0, heatCanvas.width, heatCanvas.height);
      heatCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      spotsRef.current.forEach(drawSpot);
    };

    const drawHeatLayer = () => {
      const { width, height } = getCanvasSize();

      ctx.save();

      ctx.globalCompositeOperation = "source-over";
      ctx.filter = "blur(12px) saturate(1.08)";
      ctx.drawImage(heatCanvas, 0, 0, width, height);

      ctx.restore();
    };

    const drawHiddenMessage = () => {
      const { dpr, width, height } = getCanvasSize();

      textCtx.setTransform(1, 0, 0, 1, 0, 0);
      textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      textCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillStyle = BG;
      const titleFontSize = Math.min(width * 0.09, 64);
      textCtx.font = `900 ${titleFontSize}px ${heatMapFont}`;
      textCtx.fillText("HEAT MAP PANTS", width / 2, height / 2 - 18);
      textCtx.setTransform(1, 0, 0, 1, 0, 0);
      textCtx.globalCompositeOperation = "destination-in";
      textCtx.filter = "blur(8px)";
      textCtx.drawImage(heatCanvas, 0, 0);
      textCtx.filter = "none";
      textCtx.globalCompositeOperation = "source-over";
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(textCanvas, 0, 0, width, height);
      ctx.restore();
    };

    const getCurrentHeat = () => {
      if (!spotsRef.current.length) return 0;

      return spotsRef.current.reduce(
        (maxHeat, spot) => Math.max(maxHeat, spot.heat),
        0,
      );
    };

    const animate = (time: number) => {
      const previousTime = lastFrameTimeRef.current || time;
      const delta = Math.min((time - previousTime) / 1000, 0.05);

      lastFrameTimeRef.current = time;

      const { dpr } = getCanvasSize();

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawBackground();

      if (isPressingRef.current && pointerRef.current) {
        const holdSeconds = (time - holdStartTimeRef.current) / 1000;

        if (time - lastEmitTimeRef.current >= EMIT_INTERVAL) {
          emitHeat(
            previousPointerRef.current ?? pointerRef.current,
            pointerRef.current,
            holdSeconds,
          );

          previousPointerRef.current = { ...pointerRef.current };
          lastEmitTimeRef.current = time;
        }
      }

      spotsRef.current = spotsRef.current
        .map((spot) => ({
          ...spot,
          heat: Math.max(0, spot.heat - delta * COOL_SPEED),
        }))
        .filter((spot) => spot.heat > 0.015);

      const currentHeat = getCurrentHeat();

      prepareHeatLayer();
      drawHeatLayer();
      drawHiddenMessage();

      setAudioIntensity(currentHeat);

      animationRef.current = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    animationRef.current = window.requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }

      const audio = audioRef.current;

      if (audio) {
        audio.gain.disconnect();
        audio.filter.disconnect();
        audio.oscillator.stop();
        audio.context.close();
      }
    };
  }, []);

  const getPointerPosition = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startHeating = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const pointer = getPointerPosition(event);

    if (!canvas || !pointer) return;

    canvas.setPointerCapture(event.pointerId);

    pointerRef.current = pointer;
    previousPointerRef.current = pointer;

    isPressingRef.current = true;
    holdStartTimeRef.current = performance.now();
    lastEmitTimeRef.current = 0;

    ensureAudio();

    audioRef.current?.context.resume().then(() => {
      setAudioIntensity(0.6);
    });
  };

  const moveHeating = (event: PointerEvent<HTMLCanvasElement>) => {
    const pointer = getPointerPosition(event);

    if (!pointer) return;

    pointerRef.current = pointer;
  };

  const stopHeating = (event?: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    isPressingRef.current = false;
    pointerRef.current = null;
    previousPointerRef.current = null;

    setAudioIntensity(0);

    if (event && canvas?.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#e91702] text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-cell touch-none"
        onPointerDown={startHeating}
        onPointerMove={moveHeating}
        onPointerUp={stopHeating}
        onPointerCancel={stopHeating}
        onPointerLeave={() => stopHeating()}
      />
      <div className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 text-center font-mono font-bold text-[15px] uppercase tracking-[0.2em] text-white/35 bottom-[10%]">
        HOLD TO HEAT
      </div>
    </main>
  );
}
