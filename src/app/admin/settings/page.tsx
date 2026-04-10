"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Settings, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { data: session } = useSession();

  const [email, setEmail] = useState(session?.user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [pwMsg, setPwMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg(null);
    setSavingEmail(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update email");
      setEmailMsg({ type: "ok", text: "Email updated. Sign in again with the new email." });
    } catch (err) {
      setEmailMsg({ type: "err", text: err instanceof Error ? err.message : "Update failed" });
    } finally {
      setSavingEmail(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (newPassword !== confirmPassword) {
      setPwMsg({ type: "err", text: "Passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPwMsg({ type: "err", text: "Password must be at least 6 characters." });
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");
      setPwMsg({ type: "ok", text: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPwMsg({ type: "err", text: err instanceof Error ? err.message : "Update failed" });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <>
      <div className="border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account credentials
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-6 px-6 py-8">
        {/* Email Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Address</CardTitle>
            <CardDescription>
              The email used to sign in to the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {emailMsg && (
                <p
                  className={`text-sm ${
                    emailMsg.type === "ok"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  }`}
                >
                  {emailMsg.type === "ok" && <Check className="mr-1 inline h-3.5 w-3.5" />}
                  {emailMsg.text}
                </p>
              )}
              <Button type="submit" size="sm" disabled={savingEmail} className="gap-2">
                {savingEmail && <Loader2 className="h-4 w-4 animate-spin" />}
                Update Email
              </Button>
            </form>
          </CardContent>
        </Card>

        <Separator />

        {/* Password Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Change Password</CardTitle>
            <CardDescription>
              Update the password used to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              {pwMsg && (
                <p
                  className={`text-sm ${
                    pwMsg.type === "ok"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  }`}
                >
                  {pwMsg.type === "ok" && <Check className="mr-1 inline h-3.5 w-3.5" />}
                  {pwMsg.text}
                </p>
              )}
              <Button type="submit" size="sm" disabled={savingPassword} className="gap-2">
                {savingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
