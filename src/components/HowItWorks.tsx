"use client";

import { motion } from "framer-motion";
import { Database, Brain, ListChecks, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: 1,
    icon: Database,
    title: "Connect Your Data",
    desc: "Connect your sales, waste, and supplier data (manual or automatic).",
    color: "#22c55e",
  },
  {
    step: 2,
    icon: Brain,
    title: "AI Analysis",
    desc: "AI analyses your operations and builds a customised roadmap.",
    color: "#3b82f6",
  },
  {
    step: 3,
    icon: ListChecks,
    title: "Follow Clear Steps",
    desc: "Follow clear steps to save costs, reduce emissions, and stay compliant.",
    color: "#f59e0b",
  },
  {
    step: 4,
    icon: BarChart3,
    title: "Track Progress",
    desc: "Track your progress with easy reports for customers and regulators.",
    color: "#a855f7",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            How It Works
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From Data to Impact in{" "}
            <span className="text-primary">4 Simple Steps</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Getting started takes minutes, not months.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Video embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xl"
          >
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/q3Ry9iCBuKw"
                title="RTNZero.AI Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Steps */}
          <div className="relative space-y-4">
            {/* Vertical connector line */}
            <div className="absolute left-[23px] top-8 bottom-8 w-px bg-border hidden sm:block" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-border hover:shadow-md">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div
                        className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${step.color}15` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: step.color }} />
                        <span
                          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{step.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {step.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
