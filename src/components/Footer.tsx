"use client";

import { Leaf, Globe, Briefcase, Code2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "API Docs"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "Guides", "GHG Protocol", "Case Studies", "Webinars"],
  Legal: ["Privacy", "Terms", "Cookie Policy", "GDPR", "Security"],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 text-lg font-bold">
              <Leaf className="h-5 w-5 text-primary" />
              RTNZero<span className="text-primary">.AI</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI Operating System for Sustainable Hospitality. Powering the
              circular economy for restaurants worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, Briefcase, Code2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} RTNZero.AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with 🌱 for a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
}
