"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Leaf,
  Users,
  Utensils,
  Flame,
  Droplets,
  Zap,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const initialData = {
  dailyCovers: 180,
  avgSpend: 42,
  staffOnShift: 12,
  wasteKg: 8.5,
  energyKwh: 320,
  waterLiters: 1200,
};

function calcFootprint(data: typeof initialData) {
  const foodEmissions = data.dailyCovers * data.avgSpend * 0.0012;
  const energyEmissions = data.energyKwh * 0.233;
  const waterEmissions = data.waterLiters * 0.000344;
  const wasteEmissions = data.wasteKg * 0.58;
  const total = foodEmissions + energyEmissions + waterEmissions + wasteEmissions;
  return {
    foodEmissions: +foodEmissions.toFixed(1),
    energyEmissions: +energyEmissions.toFixed(1),
    waterEmissions: +waterEmissions.toFixed(2),
    wasteEmissions: +wasteEmissions.toFixed(1),
    total: +total.toFixed(1),
    intensity: +(total / data.dailyCovers).toFixed(3),
    revenue: data.dailyCovers * data.avgSpend,
    laborPct: +((data.staffOnShift * 12 * 8) / (data.dailyCovers * data.avgSpend) * 100).toFixed(1),
  };
}

export default function DemoDashboard() {
  const [data, setData] = useState(initialData);
  const [results, setResults] = useState(() => calcFootprint(initialData));

  useEffect(() => {
    setResults(calcFootprint(data));
  }, [data]);

  // Simulated real-time tick
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        dailyCovers: prev.dailyCovers + Math.round((Math.random() - 0.3) * 3),
        energyKwh: +(prev.energyKwh + (Math.random() - 0.5) * 10).toFixed(0),
        waterLiters: Math.max(800, +(prev.waterLiters + (Math.random() - 0.5) * 40).toFixed(0)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sliders = [
    { key: "dailyCovers" as const, label: "Daily Covers", icon: Utensils, min: 50, max: 500 },
    { key: "avgSpend" as const, label: "Avg Spend (£)", icon: TrendingUp, min: 15, max: 120 },
    { key: "staffOnShift" as const, label: "Staff on Shift", icon: Users, min: 3, max: 30 },
    { key: "wasteKg" as const, label: "Food Waste (kg)", icon: Flame, min: 0, max: 40 },
    { key: "energyKwh" as const, label: "Energy (kWh)", icon: Zap, min: 100, max: 800 },
    { key: "waterLiters" as const, label: "Water (L)", icon: Droplets, min: 400, max: 3000 },
  ];

  const emissionBreakdown = [
    { label: "Food & Supply Chain", value: results.foodEmissions, color: "#22c55e" },
    { label: "Energy", value: results.energyEmissions, color: "#f59e0b" },
    { label: "Waste", value: results.wasteEmissions, color: "#ef4444" },
    { label: "Water", value: results.waterEmissions, color: "#3b82f6" },
  ];

  const maxEmission = Math.max(...emissionBreakdown.map((e) => e.value), 1);

  return (
    <section id="dashboard" className="relative py-24 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            Interactive Demo
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See Your Impact in Real-Time
          </h2>
          <p className="mt-4 text-muted-foreground">
            Adjust the sliders to simulate your restaurant&apos;s daily operations and watch the
            carbon footprint calculate live.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Input controls */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Your Operations
                </h3>
                <div className="space-y-5">
                  {sliders.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.key}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Icon className="h-3.5 w-3.5" />
                            {s.label}
                          </span>
                          <span className="font-mono font-semibold">{data[s.key]}</span>
                        </div>
                        <input
                          type="range"
                          min={s.min}
                          max={s.max}
                          step={s.key === "avgSpend" || s.key === "wasteKg" ? 0.5 : 1}
                          value={data[s.key]}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              [s.key]: parseFloat(e.target.value),
                            }))
                          }
                          className="w-full accent-primary"
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-3"
          >
            {/* KPI row */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Total Emissions",
                  value: `${results.total} kgCO₂e`,
                  icon: Leaf,
                  sub: "per day",
                },
                {
                  label: "Emission Intensity",
                  value: `${results.intensity} kgCO₂e`,
                  icon: BarChart3,
                  sub: "per cover",
                },
                {
                  label: "Daily Revenue",
                  value: `£${results.revenue.toLocaleString()}`,
                  icon: TrendingUp,
                  sub: `${results.laborPct}% labor cost`,
                },
              ].map((kpi, i) => {
                const Icon = kpi.icon;
                return (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                          {kpi.label}
                        </div>
                        <p className="mt-1 text-xl font-bold">{kpi.value}</p>
                        <p className="text-[11px] text-muted-foreground">{kpi.sub}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Emission breakdown */}
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="mb-4 text-sm font-bold">Emission Breakdown</h4>
                <div className="space-y-4">
                  {emissionBreakdown.map((e) => (
                    <div key={e.label}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{e.label}</span>
                        <span className="font-mono font-semibold">{e.value} kgCO₂e</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: e.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(e.value / maxEmission) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Score */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
              <CardContent className="flex items-center gap-6 p-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Sustainability Score</p>
                  <p className="text-2xl font-bold text-primary">
                    {Math.max(0, Math.min(100, Math.round(100 - results.intensity * 120)))}
                    <span className="text-sm font-normal text-muted-foreground">/100</span>
                  </p>
                  <Progress
                    value={Math.max(0, Math.min(100, Math.round(100 - results.intensity * 120)))}
                    className="mt-2 h-1.5"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
