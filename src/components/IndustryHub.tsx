"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  Scale,
  ExternalLink,
  Clock,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const newsItems = [
  {
    type: "regulation",
    icon: Scale,
    title: "EU CSRD Reporting Standards Updated",
    summary:
      "New sustainability reporting requirements for hospitality businesses with 250+ employees take effect Q1 2026.",
    time: "2 hours ago",
    tag: "Compliance",
    urgent: true,
  },
  {
    type: "news",
    icon: Newspaper,
    title: "UK Net Zero Hospitality Pledge Hits 5,000 Members",
    summary:
      "The voluntary initiative now covers 12% of the UK restaurant market by revenue.",
    time: "5 hours ago",
    tag: "Industry",
    urgent: false,
  },
  {
    type: "regulation",
    icon: FileText,
    title: "EPA Releases Updated Emission Factors for Food Service",
    summary:
      "Revised factors improve accuracy of Scope 3 calculations for food procurement.",
    time: "1 day ago",
    tag: "Standards",
    urgent: false,
  },
  {
    type: "news",
    icon: Newspaper,
    title: "Carbon Labelling Becomes Mainstream in QSR Sector",
    summary:
      "Three major fast-casual chains now display per-item carbon footprints on menus.",
    time: "2 days ago",
    tag: "Trend",
    urgent: false,
  },
  {
    type: "regulation",
    icon: AlertTriangle,
    title: "SEC Climate Disclosure Rules — Final Guidance",
    summary:
      "Public hospitality companies must disclose Scope 1 & 2 emissions in annual reports starting 2026.",
    time: "3 days ago",
    tag: "Compliance",
    urgent: true,
  },
];

export default function IndustryHub() {
  return (
    <section id="industry-hub" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-lg font-medium text-primary">
            Industry Hub
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stay Ahead of Regulations
          </h2>
          <p className="mt-4 text-muted-foreground">
            Live industry news and regulatory tracking to keep you compliant and informed.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-5">
          {/* Live feed */}
          <div className="space-y-3 lg:col-span-3">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Live Feed
            </div>
            {newsItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="group cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-border hover:shadow-md">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          item.type === "regulation"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold truncate">
                            {item.title}
                          </h4>
                          {item.urgent && (
                            <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.summary}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.time}
                          </span>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {item.tag}
                          </Badge>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground/0 transition-all group-hover:text-muted-foreground" />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar trackers */}
          <div className="space-y-4 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h4 className="mb-4 text-sm font-bold">Regulation Tracker</h4>
                  <div className="space-y-3">
                    {[
                      { name: "CSRD (EU)", status: "Active", color: "#22c55e" },
                      { name: "SEC Climate", status: "Final Rule", color: "#f59e0b" },
                      { name: "ISSB S2", status: "Adopted", color: "#22c55e" },
                      { name: "UK TCFD", status: "Mandatory", color: "#22c55e" },
                    ].map((reg) => (
                      <div key={reg.name} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{reg.name}</span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{
                            backgroundColor: `${reg.color}15`,
                            color: reg.color,
                          }}
                        >
                          {reg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h4 className="mb-4 text-sm font-bold">Your Compliance Score</h4>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-primary">87</span>
                    <span className="mb-1 text-sm text-muted-foreground">/100</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    3 action items remaining to reach full compliance.
                  </p>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: "87%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
