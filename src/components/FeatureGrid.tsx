"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Users,
  Package,
  Zap,
  Cloud,
  CalendarDays,
  BadgeDollarSign,
  Brain,
  Clock,
  MapPin,
  BarChart3,
  Trash2,
  ClipboardList,
  Droplets,
  Thermometer,
  BatteryCharging,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "sales",
    label: "Sales Intelligence",
    icon: TrendingUp,
    color: "#22c55e",
    description: "AI-powered demand forecasting and revenue optimization",
    features: [
      {
        icon: Brain,
        title: "AI Demand Forecasting",
        desc: "Predict sales with 95% accuracy using ML models trained on your historical data.",
      },
      {
        icon: Cloud,
        title: "Weather & Event Impact",
        desc: "Auto-adjust forecasts based on local weather, holidays, and nearby events.",
      },
      {
        icon: CalendarDays,
        title: "Smart Promotions",
        desc: "AI-recommended promotions that maximize revenue while minimizing waste.",
      },
      {
        icon: BadgeDollarSign,
        title: "Revenue Analytics",
        desc: "Real-time revenue dashboards with trend analysis and anomaly detection.",
      },
    ],
  },
  {
    id: "workforce",
    label: "Workforce Management",
    icon: Users,
    color: "#3b82f6",
    description: "Intelligent staff scheduling and productivity optimization",
    features: [
      {
        icon: Clock,
        title: "Optimized Rotas",
        desc: "Auto-generate shift schedules that balance labor costs with demand forecasts.",
      },
      {
        icon: Brain,
        title: "Skills Matching",
        desc: "Match staff to shifts based on skills, certifications, and performance data.",
      },
      {
        icon: MapPin,
        title: "Commute Analysis",
        desc: "Factor in commute times and transportation costs for fairer scheduling.",
      },
      {
        icon: BarChart3,
        title: "Productivity Tracking",
        desc: "Measure and optimize team performance with AI-driven insights.",
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory Management",
    icon: Package,
    color: "#f59e0b",
    description: "End-to-end stock control with zero-waste intelligence",
    features: [
      {
        icon: Package,
        title: "Smart Stock Control",
        desc: "Automated reorder points and par levels driven by demand predictions.",
      },
      {
        icon: Trash2,
        title: "Waste Reduction",
        desc: "Track, categorize, and reduce waste with AI recommendations.",
      },
      {
        icon: ClipboardList,
        title: "Bill of Materials",
        desc: "Precise recipe costing and ingredient tracking across every menu item.",
      },
      {
        icon: BadgeDollarSign,
        title: "Cost Analytics",
        desc: "Real-time food cost percentage tracking with margin optimization.",
      },
    ],
  },
  {
    id: "utilities",
    label: "Utilities & Equipment",
    icon: Zap,
    color: "#a855f7",
    description: "Energy, water, and equipment efficiency monitoring",
    features: [
      {
        icon: BatteryCharging,
        title: "Energy Tracking",
        desc: "Monitor electricity and gas usage per square foot with benchmarking.",
      },
      {
        icon: Droplets,
        title: "Water Monitoring",
        desc: "Track water consumption patterns and detect leaks automatically.",
      },
      {
        icon: Thermometer,
        title: "Refrigeration Efficiency",
        desc: "Smart monitoring for coolers and freezers with predictive maintenance.",
      },
      {
        icon: BarChart3,
        title: "Equipment Analytics",
        desc: "Lifecycle tracking and efficiency scoring for all kitchen equipment.",
      },
    ],
  },
];

export default function FeatureGrid() {
  const [activeTab, setActiveTab] = useState("sales");
  const active = categories.find((c) => c.id === activeTab)!;

  return (
    <section id="ecosystem" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            Feature Ecosystem
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need.{" "}
            <span className="text-muted-foreground">Nothing You Don&apos;t.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Four intelligence pillars powering your sustainable operations.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow-lg"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
                style={isActive ? { backgroundColor: cat.color } : undefined}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Feature cards — animated */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-8 text-center text-muted-foreground">{active.description}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {active.features.map((feat, i) => {
                const FIcon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="group relative h-full overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg">
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${active.color}08, ${active.color}03)`,
                        }}
                      />
                      <CardContent className="relative p-6">
                        <div
                          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${active.color}15` }}
                        >
                          <FIcon className="h-5 w-5" style={{ color: active.color }} />
                        </div>
                        <h3 className="mb-2 text-sm font-semibold">{feat.title}</h3>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {feat.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
