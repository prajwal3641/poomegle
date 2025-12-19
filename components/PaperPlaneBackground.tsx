"use client";

import React, { useEffect, useRef } from "react";

export const PaperPlaneBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    // --- Configuration ---
    const DURATION = 14000; // Time per loop
    const TRAIL_LENGTH_TIME = 1200;
    const TRAIL_SEGMENTS = 50;
    const FOV = 900;
    const SCALE_FACTOR = 1.8;

    // --- Physics / Math Helpers ---

    // Ease Out Quad for "Fast then Slow" effect
    // Input 0..1, Output 0..1
    const getCurvedTime = (p: number) => {
      // 1 - (1-p)^2.2 makes it zoom fast initially then glide
      return 1 - Math.pow(1 - p, 2.2);
    };

    // Path definitions
    // We define start/end points and spiral characteristics for different paths
    const getPathConfig = (index: number) => {
      const hw = width / 2;
      const hh = height / 2;
      const minDim = Math.min(width, height);

      const paths = [
        // Path 0: Classic Top-Left to Bottom-Right (Wide Spiral)
        {
          start: { x: -hw * 1.5, y: -hh * 1.5, z: 1200 },
          end: { x: hw * 1.5, y: hh * 1.2, z: -400 },
          radius: minDim * 0.5, // Wide
          loops: 3,
          rotationOffset: 0,
        },
        // Path 1: Top-Right to Bottom-Left (Cross Screen)
        {
          start: { x: hw * 1.5, y: -hh * 1.5, z: 1200 },
          end: { x: -hw * 1.5, y: hh * 1.5, z: -400 },
          radius: minDim * 0.6, // Even Wider
          loops: 2.5,
          rotationOffset: Math.PI,
        },
        // Path 2: Top-Center to Left-Bottom (Deep dive)
        {
          start: { x: 0, y: -hh * 2, z: 1500 },
          end: { x: -hw * 1.2, y: hh * 1.8, z: -200 },
          radius: minDim * 0.7, // Very Wide spiral
          loops: 2,
          rotationOffset: Math.PI / 2,
        },
      ];

      return paths[index % paths.length];
    };

    // Calculate 3D position based on current path and progress(0..1)
    const getPos = (progress: number, pathIdx: number) => {
      // 1. Apply speed curve
      const t = getCurvedTime(progress);

      // 2. Get current path params
      const config = getPathConfig(pathIdx);

      // 3. Linear Interpolation for Center Line
      const lx = config.start.x + (config.end.x - config.start.x) * t;
      const ly = config.start.y + (config.end.y - config.start.y) * t;
      const lz = config.start.z + (config.end.z - config.start.z) * t;

      // 4. Spiral Offset
      const angle = t * Math.PI * 2 * config.loops + config.rotationOffset;
      const sx = Math.cos(angle) * config.radius;
      const sy = Math.sin(angle) * config.radius;

      return {
        x: lx + sx,
        y: ly + sy,
        z: lz,
      };
    };

    // Project 3D -> 2D
    const project = (p: { x: number; y: number; z: number }) => {
      const safeZ = Math.max(p.z, -FOV + 10);
      const scale = FOV / (FOV + safeZ);
      return {
        x: width / 2 + p.x * scale,
        y: height / 2 + p.y * scale,
        scale: scale,
      };
    };

    // --- Animation Loop ---

    let startTime = Date.now();
    let currentPathIndex = 0;
    let frameId: number;

    const animate = () => {
      const now = Date.now();
      let elapsed = now - startTime;

      // Check if loop finished
      if (elapsed > DURATION) {
        startTime = now;
        elapsed = 0;
        currentPathIndex++; // Switch to next path variation
      }

      const linearT = elapsed / DURATION; // 0 to 1

      // Theme Colors
      const isDark = document.documentElement.classList.contains("dark");
      const planeColor = isDark ? "#FFC8C8" : "#4b5563";
      const trailColor = isDark
        ? "rgba(255, 200, 200, 0.3)"
        : "rgba(75, 85, 99, 0.3)";

      ctx.clearRect(0, 0, width, height);

      // --- Draw Trail ---
      // We need to calculate previous points based on current path config
      const trailPoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= TRAIL_SEGMENTS; i++) {
        const dt = (i / TRAIL_SEGMENTS) * (TRAIL_LENGTH_TIME / DURATION);
        const pt = linearT - dt;

        if (pt < 0) continue; // Don't draw trail from previous loop

        const pos3d = getPos(pt, currentPathIndex);
        const pos2d = project(pos3d);
        trailPoints.push(pos2d);
      }

      if (trailPoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
        for (let i = 1; i < trailPoints.length; i++) {
          ctx.lineTo(trailPoints[i].x, trailPoints[i].y);
        }

        ctx.setLineDash([8, 16]);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2;
        ctx.strokeStyle = trailColor;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // --- Draw Plane ---
      const currentPos3d = getPos(linearT, currentPathIndex);
      const currentPos2d = project(currentPos3d);

      // Calculate rotation
      const futurePos3d = getPos(
        Math.min(linearT + 0.005, 1),
        currentPathIndex
      );
      const futurePos2d = project(futurePos3d);

      const dx = futurePos2d.x - currentPos2d.x;
      const dy = futurePos2d.y - currentPos2d.y;
      const rotationAngle = Math.atan2(dy, dx);

      ctx.save();
      ctx.translate(currentPos2d.x, currentPos2d.y);
      ctx.rotate(rotationAngle);
      ctx.scale(SCALE_FACTOR, SCALE_FACTOR);

      ctx.fillStyle = planeColor;

      // Plane Shape
      ctx.beginPath();
      ctx.moveTo(15, 0); // Nose
      ctx.lineTo(-10, 8); // Left Wing
      ctx.lineTo(-5, 0); // Center indent
      ctx.lineTo(-10, -8); // Right Wing
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
