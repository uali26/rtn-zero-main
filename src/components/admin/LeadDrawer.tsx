"use client";

import { useState } from "react";
import { Send, Trash2, Loader2, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import type { LeadWithNotes, LeadNote, LeadStatus } from "@/lib/types/lead";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types/lead";

/* ── Status Stepper ──────────────────────────────────────────────────── */

const STEPPER_STAGES: { key: LeadStatus; label: string }[] = [
  { key: "CONTACT_FORM", label: "Contact Form" },
  { key: "MEETING_SCHEDULED", label: "Meeting Scheduled" },
  { key: "DECISION", label: "Decision" },
  { key: "CONVERTED", label: "Converted" },
];

function stageIndex(status: LeadStatus): number {
  if (status === "LOST") return -1;
  const idx = STEPPER_STAGES.findIndex((s) => s.key === status);
  // Statuses between steps map to the previous completed step
  if (idx !== -1) return idx;
  if (status === "CONTACT_FORM") return 0;
  if (status === "MEETING_SCHEDULED" || status === "DECISION") return 2;
  return 0;
}

function StatusStepper({ status }: { status: LeadStatus }) {
  const active = stageIndex(status);
  const isLost = status === "LOST";

  return (
    <div className="flex items-center gap-1">
      {STEPPER_STAGES.map((stage, i) => {
        const completed = !isLost && active > i;
        const current = !isLost && active === i;
        return (
          <div key={stage.key} className="flex items-center gap-1">
            {i > 0 && (
              <div
                className={`h-0.5 w-6 rounded-full transition-colors ${
                  completed
                    ? "bg-primary"
                    : "bg-border"
                }`}
              />
            )}
            <div
              className={`flex h-7 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors ${
                completed
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted/40 text-muted-foreground"
              }`}
            >
              {completed && <Check className="h-3 w-3" />}
              {stage.label}
            </div>
          </div>
        );
      })}
      {isLost && (
        <>
          <div className="h-0.5 w-6 rounded-full bg-destructive/40" />
          <div className="flex h-7 items-center rounded-full border border-destructive/40 bg-destructive/10 px-3 text-xs font-medium text-destructive">
            Lost
          </div>
        </>
      )}
    </div>
  );
}

/* ── Drawer ───────────────────────────────────────────────────────────── */

interface LeadDrawerProps {
  lead: LeadWithNotes | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNoteSaved: (leadId: string, notes: LeadNote[]) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}

export function LeadDrawer({
  lead,
  open,
  onOpenChange,
  onNoteSaved,
  onStatusChange,
}: LeadDrawerProps) {
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!lead) return null;

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteText.trim() }),
      });
      if (!res.ok) throw new Error("Failed to save note");
      const newNote: LeadNote = await res.json();
      onNoteSaved(lead.id, [newNote, ...lead.notes]);
      setNoteText("");
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    setDeletingId(noteId);
    try {
      const res = await fetch(
        `/api/admin/leads/${lead.id}/notes/${noteId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete note");
      onNoteSaved(
        lead.id,
        lead.notes.filter((n) => n.id !== noteId)
      );
    } catch (err) {
      console.error("Failed to delete note:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-lg"
      >
        {/* ── Header: Title + Status Stepper ─────────────────────────── */}
        <SheetHeader className="shrink-0 space-y-3 border-b border-border/40 pb-4">
          <div className="flex items-start justify-between gap-3 pr-8">
            <div>
              <SheetTitle className="text-lg">
                {lead.businessName}
              </SheetTitle>
              <SheetDescription>{lead.email}</SheetDescription>
            </div>
            <Badge
              className={`shrink-0 ${STATUS_COLORS[lead.status]}`}
              variant="secondary"
            >
              {STATUS_LABELS[lead.status]}
            </Badge>
          </div>
          <StatusStepper status={lead.status} />
        </SheetHeader>

        {/* ── Body: Lead info + Activity Timeline ────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Phone
              </p>
              <p className="mt-0.5 text-sm">{lead.phone || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Country
              </p>
              <p className="mt-0.5 text-sm">{lead.country}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Address
              </p>
              <p className="mt-0.5 text-sm">
                {lead.addressLine1}
                {lead.addressLine2 ? `, ${lead.addressLine2}` : ""}
                {" — "}
                {lead.city}, {lead.postcode}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                POS Vendor
              </p>
              <p className="mt-0.5 text-sm capitalize">
                {lead.posVendor || "None"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Smart Meter
              </p>
              <Badge
                variant={lead.smartMeter ? "default" : "secondary"}
                className="mt-1"
              >
                {lead.smartMeter ? "Yes" : "No"}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Activity Timeline */}
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Activity Timeline
            </h3>

            {lead.notes.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No notes yet — add one below.
              </p>
            ) : (
              <div className="relative space-y-0">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                {lead.notes.map((note, i) => (
                  <div key={note.id} className="group relative flex gap-3 pb-4">
                    {/* Dot */}
                    <div
                      className={`relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 ${
                        i === 0
                          ? "border-primary bg-primary/20"
                          : "border-border bg-background"
                      }`}
                    />
                    {/* Card */}
                    <div className="flex-1 rounded-lg border border-border/50 bg-muted/20 p-3">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {note.content}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.createdAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNote(note.id)}
                          disabled={deletingId === note.id}
                          className="h-6 gap-1 px-2 text-xs text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          {deletingId === note.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer: Sticky note input ──────────────────────────────── */}
        <SheetFooter className="shrink-0 border-t border-border/40 p-4">
          <Textarea
            placeholder="Add a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={2}
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleAddNote();
              }
            }}
          />
          <Button
            size="sm"
            onClick={handleAddNote}
            disabled={saving || !noteText.trim()}
            className="w-full gap-1.5"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Save Note
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
