"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type InviteCheck = {
  id: string;
  emailTo: string;
  expiresAt: string | null;
  usedAt: string | null;
  lead?: {
    id: string;
    businessName: string;
    email: string;
    status: string;
  } | null;
};

export default function SetupPage() {
  const params = useParams<{ token: string }>();
  const token = params.token;

  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<InviteCheck | null>(null);
  const [invalid, setInvalid] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const defaults = useMemo(() => {
    return {
      orgName: invite?.lead?.businessName ?? "",
      billingEmail: invite?.emailTo ?? "",
      billingAddress: "",
      countryCode: "GB",
      fullName: "",
      email: invite?.emailTo ?? "",
      password: "",
    };
  }, [invite]);

  const [form, setForm] = useState(defaults);

  useEffect(() => {
    setForm(defaults);
  }, [defaults]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setInvalid(null);
      try {
        const res = await fetch(`/api/setup/invite/${token}`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) {
          if (!cancelled) setInvalid(data?.message || "This invite link is not valid.");
          return;
        }
        if (!cancelled) setInvite(data);
      } catch {
        if (!cancelled) setInvalid("Could not validate this invite right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setInvalid(null);
    try {
      const res = await fetch("/api/setup/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setInvalid(data?.message || "Setup failed.");
        return;
      }
      setDone(true);
    } catch {
      setInvalid("Setup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 items-center justify-center px-6 py-16">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Validating invite…
        </div>
      </div>
    );
  }

  if (invalid) {
    return (
      <div className="mx-auto w-full max-w-xl flex-1 px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Link not valid
            </CardTitle>
            <CardDescription>{invalid}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/">Back to homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto w-full max-w-xl flex-1 px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Account created
            </CardTitle>
            <CardDescription>
              Your organisation and admin account have been created successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button asChild>
              <Link href="/login">Go to admin login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl flex-1 px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Set up your account</CardTitle>
          <CardDescription>
            Create your organisation and first admin user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organisation name</Label>
              <Input id="orgName" value={form.orgName} onChange={onChange("orgName")} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingEmail">Billing email</Label>
              <Input id="billingEmail" type="email" value={form.billingEmail} onChange={onChange("billingEmail")} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing address (optional)</Label>
              <Input id="billingAddress" value={form.billingAddress} onChange={onChange("billingAddress")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryCode">Country code</Label>
              <Input id="countryCode" value={form.countryCode} onChange={onChange("countryCode")} maxLength={2} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Admin full name</Label>
              <Input id="fullName" value={form.fullName} onChange={onChange("fullName")} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Admin email</Label>
              <Input id="email" type="email" value={form.email} onChange={onChange("email")} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={onChange("password")} required />
            </div>

            {invalid && (
              <p className="text-sm text-destructive">{invalid}</p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

