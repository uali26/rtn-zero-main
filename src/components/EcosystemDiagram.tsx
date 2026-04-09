"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Package,
  Zap,
  Leaf,
} from "lucide-react";

const segments = [
  {
    id: "sales",
    label: "Sales",
    icon: TrendingUp,
    color: "#22c55e",
    angle: -45,
    features: ["AI Demand Forecasting", "Weather & Event Impact", "Smart Promotions"],
  },
  {
    id: "workforce",
    label: "Workforce",
    icon: Users,
    color: "#3b82f6",
    angle: 45,
    features: ["Optimized Rotas", "Skills Matching", "Wage & Commute Analysis"],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Package,
    color: "#f59e0b",
    angle: 135,
    features: ["Stock Management", "Waste Reduction", "Bill of Materials"],
  },
  {
    id: "utilities",
    label: "Utilities",
    icon: Zap,
    color: "#a855f7",
    angle: 225,
    features: ["Energy Tracking", "Water Monitoring", "Refrigeration Efficiency"],
  },
];

export default function EcosystemDiagram() {
  const [active, setActive] = useState<string | null>(null);

  const size = 400;
  const center = size / 2;
  const outerRadius = 160;
  const innerRadius = 65;
  const segmentRadius = 115;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Slow rotation wrapper */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {/* Outer ring */}
        <svg width={size} height={size} className="absolute inset-0">
          <circle
            cx={center}
            cy={center}
            r={outerRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border"
            strokeDasharray="4 4"
          />
          <circle
            cx={center}
            cy={center}
            r={outerRadius + 30}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-border/50"
          />
        </svg>
      </motion.div>

      {/* Segments — counter-rotate to stay upright inside the rotating container */}
      {segments.map((seg) => {
        const rad = (seg.angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * segmentRadius;
        const y = center + Math.sin(rad) * segmentRadius;
        const isActive = active === seg.id;
        const Icon = seg.icon;

        return (
          <motion.div
            key={seg.id}
            className="absolute flex flex-col items-center gap-1"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
            onHoverStart={() => setActive(seg.id)}
            onHoverEnd={() => setActive(null)}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.15 : 1,
                boxShadow: isActive
                  ? `0 0 30px ${seg.color}40`
                  : `0 0 0px ${seg.color}00`,
              }}
              className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-border/50 bg-card shadow-lg backdrop-blur-sm"
            >
              <Icon className="h-6 w-6" style={{ color: seg.color }} />
              {/* Pulse ring */}
              {isActive && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl border-2"
                  style={{ borderColor: seg.color }}
                />
              )}
            </motion.div>
            <span className="mt-1 text-[11px] font-semibold tracking-wide text-muted-foreground">
              {seg.label}
            </span>

            {/* Feature tooltip */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute top-full mt-3 w-48 rounded-xl border border-border/50 bg-card/95 p-3 shadow-2xl backdrop-blur-md"
              >
                <p className="mb-2 text-xs font-bold" style={{ color: seg.color }}>
                  {seg.label} Intelligence
                </p>
                {seg.features.map((f) => (
                  <p key={f} className="flex items-center gap-1.5 py-0.5 text-xs text-muted-foreground">
                    <span className="h-1 w-1 rounded-full" style={{ backgroundColor: seg.color }} />
                    {f}
                  </p>
                ))}
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Center hub — Environmental Intelligence */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px oklch(0.55 0.18 155 / 0.15)",
            "0 0 40px oklch(0.55 0.18 155 / 0.25)",
            "0 0 20px oklch(0.55 0.18 155 / 0.15)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute left-1/2 top-1/2 flex h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm"
      >
        <Leaf className="mb-1 h-8 w-8 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
          Environmental
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
          Intelligence
        </span>
      </motion.div>

      {/* Connecting lines */}
      <svg
        width={size}
        height={size}
        className="pointer-events-none absolute inset-0"
      >
        {segments.map((seg) => {
          const rad = (seg.angle * Math.PI) / 180;
          const x = center + Math.cos(rad) * (innerRadius + 10);
          const y = center + Math.sin(rad) * (innerRadius + 10);
          const ox = center + Math.cos(rad) * (segmentRadius - 30);
          const oy = center + Math.sin(rad) * (segmentRadius - 30);
          return (
            <line
              key={seg.id}
              x1={x}
              y1={y}
              x2={ox}
              y2={oy}
              stroke={active === seg.id ? seg.color : "currentColor"}
              strokeWidth={active === seg.id ? 2 : 1}
              className={active === seg.id ? "" : "text-border"}
              strokeDasharray={active === seg.id ? "none" : "3 3"}
              style={{
                transition: "stroke 0.3s, stroke-width 0.3s",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
