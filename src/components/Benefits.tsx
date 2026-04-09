"use client";

import { motion } from "framer-motion";
import { PiggyBank, Leaf, Award, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: PiggyBank,
    title: "Save up to £30,000/year",
    desc: "Through waste and energy savings.",
    color: "#22c55e",
  },
  {
    icon: Leaf,
    title: "Reduce carbon emissions",
    desc: "Without hiring consultants.",
    color: "#3b82f6",
  },
  {
    icon: Award,
    title: "Build your brand",
    desc: "As a sustainable business customers trust.",
    color: "#f59e0b",
  },
  {
    icon: Gift,
    title: "Earn rewards",
    desc: "For taking green actions.",
    color: "#a855f7",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-24 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            Benefits for You
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Real results that impact your{" "}
            <span className="text-primary">bottom line</span> and the
            environment.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg">
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${b.color}08, ${b.color}03)`,
                    }}
                  />
                  <CardContent className="relative flex flex-col items-center p-8 text-center">
                    <div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${b.color}15` }}
                    >
                      <Icon className="h-7 w-7" style={{ color: b.color }} />
                    </div>
                    <h3 className="mb-2 text-base font-bold">{b.title}</h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
