"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Coins,
  Share2,
  Rocket,
  Check,
  Clock,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const roadmapItems = [
  {
    phase: "Now",
    icon: Check,
    status: "live",
    title: "Core Platform",
    desc: "Sales, Workforce, Inventory, Utilities intelligence with full environmental tracking.",
    color: "#22c55e",
  },
  {
    phase: "Q3 2026",
    icon: Clock,
    status: "building",
    title: "Inventory Marketplace",
    desc: "Peer-to-peer surplus ingredient marketplace between restaurants to eliminate waste.",
    color: "#3b82f6",
    enterprise: true,
  },
  {
    phase: "Q4 2026",
    icon: Coins,
    status: "upcoming",
    title: "Carbon Credit Trading",
    desc: "Earn and trade verified carbon credits from your sustainability improvements.",
    color: "#f59e0b",
    enterprise: true,
  },
  {
    phase: "2027",
    icon: Share2,
    status: "upcoming",
    title: "Social Marketing Suite",
    desc: "Auto-generate sustainability content for social media from your real impact data.",
    color: "#a855f7",
    enterprise: true,
  },
  {
    phase: "2027+",
    icon: Rocket,
    status: "vision",
    title: "Multi-Site Command Center",
    desc: "Enterprise portfolio management with cross-location benchmarking and rollups.",
    color: "#ec4899",
    enterprise: true,
  },
];

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  live: { label: "Live", variant: "default" },
  building: { label: "In Development", variant: "secondary" },
  upcoming: { label: "Coming Soon", variant: "outline" },
  vision: { label: "Vision", variant: "outline" },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            Roadmap
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Today.{" "}
            <span className="text-muted-foreground">Designed for Tomorrow.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our vision extends beyond operations into a full circular economy for hospitality.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {roadmapItems.map((item, i) => {
              const Icon = item.icon;
              const status = statusLabels[item.status];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <span
                      className="h-3 w-3 rounded-full border-2 border-background"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-12 shrink-0 md:hidden" />

                  {/* Content card */}
                  <div className={`flex-1 md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                    <Card
                      className={`border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:shadow-md ${
                        item.status === "live" ? "border-primary/30" : ""
                      }`}
                    >
                      <CardContent className="p-5">
                        <div className="mb-3 flex items-center gap-2">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${item.color}15` }}
                          >
                            <Icon className="h-4 w-4" style={{ color: item.color }} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {item.phase}
                          </span>
                          <Badge variant={status.variant} className="ml-auto text-[10px]">
                            {status.label}
                          </Badge>
                          {item.enterprise && (
                            <Badge variant="outline" className="gap-1 text-[10px]">
                              <Lock className="h-2.5 w-2.5" />
                              Enterprise
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Counter-spacer for desktop alignment */}
                  <div className="hidden flex-1 md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
