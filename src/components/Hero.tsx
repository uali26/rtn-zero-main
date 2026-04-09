"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EcosystemDiagram from "./EcosystemDiagram";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row lg:gap-20">
        {/* Left content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now in Private Beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            The AI Operating System for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sustainable Hospitality
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Unify Sales, Workforce, Inventory, and Utilities intelligence with
            full carbon footprint tracking. One circular ecosystem. Zero waste
            operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => { window.location.hash = '#ecosystem'; }}>
                Explore the Ecosystem
                <ChevronDown className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              SOC 2 Compliant
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              GDPR Ready
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              GHG Protocol
            </div>
          </motion.div>
        </div>

        {/* Right — Ecosystem Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="flex flex-1 items-center justify-center"
        >
          <EcosystemDiagram />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
