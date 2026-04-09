"use client";

import { motion } from "framer-motion";
import { Leaf, Factory, Truck, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const scopes = [
  {
    scope: "Scope 1",
    label: "Direct Emissions",
    icon: Factory,
    color: "#ef4444",
    desc: "On-site fuel combustion, company vehicles, refrigerant leaks.",
    value: 34,
    metric: "2.4 tCO₂e/mo",
  },
  {
    scope: "Scope 2",
    label: "Indirect — Energy",
    icon: Building2,
    color: "#f59e0b",
    desc: "Purchased electricity, heating, and cooling for your venues.",
    value: 52,
    metric: "3.8 tCO₂e/mo",
  },
  {
    scope: "Scope 3",
    label: "Value Chain",
    icon: Truck,
    color: "#8b5cf6",
    desc: "Supply chain, food sourcing, waste disposal, staff commuting.",
    value: 78,
    metric: "5.6 tCO₂e/mo",
  },
];

const metrics = [
  { label: "Emission Intensity", value: "0.42 kgCO₂e/cover", change: -12, progress: 42 },
  { label: "Carbon Footprint", value: "11.8 tCO₂e/month", change: -8, progress: 65 },
  { label: "Renewable Energy", value: "34% of total", change: +15, progress: 34 },
  { label: "Waste Diversion Rate", value: "78% diverted", change: +5, progress: 78 },
];

export default function EnvironmentalIntelligence() {
  return (
    <section id="intelligence" className="relative py-24 px-6">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-lg font-medium text-primary">
            <Leaf className="h-3.5 w-3.5" />
            The Core
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Environmental Intelligence
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Full GHG Protocol-compliant carbon tracking across Scope 1, 2, and
            3. From kitchen to supply chain.
          </p>
        </motion.div>

        {/* Glassmorphism main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-primary/20 bg-card/60 backdrop-blur-xl">
            {/* Gradient border glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

            <CardContent className="relative grid gap-8 p-8 lg:grid-cols-2">
              {/* Scopes */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">GHG Protocol Scopes</h3>
                {scopes.map((scope, i) => {
                  const Icon = scope.icon;
                  return (
                    <motion.div
                      key={scope.scope}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${scope.color}15` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: scope.color }} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span
                              className="text-xs font-bold uppercase tracking-wider"
                              style={{ color: scope.color }}
                            >
                              {scope.scope}
                            </span>
                            <p className="text-sm font-medium">{scope.label}</p>
                          </div>
                          <span className="text-sm font-mono font-semibold text-muted-foreground">
                            {scope.metric}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{scope.desc}</p>
                        <Progress value={scope.value} className="h-1.5" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Key metrics */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Key Metrics</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                          <p className="mt-1 text-lg font-bold">{m.value}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <Progress value={m.progress} className="h-1 flex-1 mr-3" />
                            <span
                              className={`text-xs font-semibold ${
                                m.change < 0 ? "text-green-500" : "text-amber-500"
                              }`}
                            >
                              {m.change > 0 ? "+" : ""}
                              {m.change}%
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
