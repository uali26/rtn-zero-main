"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const countries = [
  "United Kingdom",
  "Ireland",
  "United States",
  "Canada",
  "Australia",
  "France",
  "Germany",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Portugal",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "New Zealand",
  "Singapore",
  "United Arab Emirates",
  "India",
  "Japan",
  "South Korea",
  "Other",
];

const eposSystems = [
  "Square",
  "SumUp",
  "Lightspeed",
  "Toast",
  "Tevalis",
  "Other",
];

export default function BookAChat() {
  const [usesPOS, setUsesPOS] = useState<string>("");
  const [eposSystem, setEposSystem] = useState<string>("");
  const [smartMeter, setSmartMeter] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (setter: (v: string) => void) => (value: string | null) => {
    setter(value ?? "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book-a-chat" className="relative py-24 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-lg font-medium text-primary">
            <MessageCircle className="h-3.5 w-3.5" />
            Get Started
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Book a Chat
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us about your business and we&apos;ll show you how RTNZero.AI
            can transform your operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-primary/20 bg-card/60 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <CardContent className="relative p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Thank You!</h3>
                  <p className="max-w-sm text-muted-foreground">
                    We&apos;ve received your details. Our team will be in touch
                    within 24 hours to schedule your chat.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                  >
                    Submit Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Business Details */}
                  <div>
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Business Details
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">
                          Business Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          placeholder="e.g. The Green Kitchen"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@restaurant.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+44 7700 900000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address1">
                          Address Line 1 <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="address1"
                          name="address1"
                          placeholder="Street address"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address2">Address Line 2 (optional)</Label>
                        <Input
                          id="address2"
                          name="address2"
                          placeholder="Suite, floor, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          City <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="London"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postcode">
                          Postcode <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="postcode"
                          name="postcode"
                          placeholder="SW1A 1AA"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          Country <span className="text-destructive">*</span>
                        </Label>
                        <Select value={country} onValueChange={handleSelect(setCountry)} required>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* POS Section */}
                  <div>
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Technical Details
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>
                          Do you use a POS? <span className="text-destructive">*</span>
                        </Label>
                        <Select value={usesPOS} onValueChange={handleSelect(setUsesPOS)} required>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {usesPOS === "yes" && (
                        <motion.div
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-2"
                        >
                          <Label>
                            Current EPOS System{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={eposSystem}
                            onValueChange={handleSelect(setEposSystem)}
                            required
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select system..." />
                            </SelectTrigger>
                            <SelectContent>
                              {eposSystems.map((sys) => (
                                <SelectItem key={sys} value={sys.toLowerCase()}>
                                  {sys}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Utility Section */}
                  <div>
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Utility Information
                    </h3>
                    <div className="space-y-3">
                      <Label>
                        Smart meter installed?{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <RadioGroup
                        value={smartMeter}
                        onValueChange={setSmartMeter}
                        className="flex flex-wrap gap-4"
                      >
                        {[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                          { value: "not-sure", label: "Not sure" },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm transition-colors hover:border-primary/30 has-[data-checked]:border-primary has-[data-checked]:bg-primary/5"
                          >
                            <RadioGroupItem value={opt.value} />
                            {opt.label}
                          </label>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                    Book Your Free Consultation
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
