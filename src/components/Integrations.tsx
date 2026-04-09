"use client";

import { motion } from "framer-motion";

const partners = [
  "Toast",
  "Lightspeed",
  "Vita Mojo",
  "Square",
  "SumUp",
  "Tevalis",
  "Clover",
  "Zonal",
  "Revel",
  "PAR PixelPoint",
  "Oracle MICROS",
  "My Order Box",
  "Epos Now",
  "Innova",
  "Captiva POS",
];

export default function Integrations() {
  return (
    <section id="integrations" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-lg font-medium text-primary">
            Integrations
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Works With Your Existing{" "}
            <span className="text-primary">POS System</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Seamless integrations with the platforms you already use.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group flex h-20 items-center justify-center rounded-xl border border-border/50 bg-card/80 px-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <span className="text-center text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
