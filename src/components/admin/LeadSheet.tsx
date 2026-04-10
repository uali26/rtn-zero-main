"use client";

import { useState } from "react";
import { Send, Trash2, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import type { LeadWithNotes, LeadNote } from "@/lib/types/lead";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types/lead";

interface LeadSheetProps {
  lead: LeadWithNotes | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNoteSaved: (leadId: string, notes: LeadNote[]) => void;
}

export function LeadSheet({
  lead,
  open,
  onOpenChange,
  onNoteSaved,
}: LeadSheetProps) {
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
      <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-lg">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-left text-lg">
            {lead.businessName}
          </SheetTitle>
          <SheetDescription className="text-left">
            Lead details and notes
          </SheetDescription>
        </SheetHeader>

        {/* Lead Info */}
        <div className="space-y-3 pb-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Email
              </p>
              <p>{lead.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Phone
              </p>
              <p>{lead.phone || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Address
              </p>
              <p>
                {lead.addressLine1}
                {lead.addressLine2 ? `, ${lead.addressLine2}` : ""}
              </p>
              <p>
                {lead.city}, {lead.postcode}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Country
              </p>
              <p>{lead.country}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                POS Vendor
              </p>
              <p className="capitalize">{lead.posVendor || "None"}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Smart Meter
              </p>
              <Badge variant={lead.smartMeter ? "default" : "secondary"}>
                {lead.smartMeter ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              Status:
            </span>
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[lead.status]}`}
            >
              {STATUS_LABELS[lead.status]}
            </span>
          </div>
        </div>

        <Separator />

        {/* Notes Section */}
        <div className="flex flex-1 flex-col gap-4 pt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Notes
          </h3>

          {/* Add Note */}
          <div className="space-y-2">
            <Textarea
              placeholder="Add a note about this lead..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Button
              size="sm"
              onClick={handleAddNote}
              disabled={saving || !noteText.trim()}
              className="gap-1.5"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              Save Note
            </Button>
          </div>

          {/* Notes List */}
          <div className="space-y-3">
            {lead.notes.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No notes yet. Add one above.
              </p>
            ) : (
              lead.notes.map((note) => (
                <div
                  key={note.id}
                  className="group rounded-lg border border-border/50 bg-muted/30 p-3"
                >
                  <p className="whitespace-pre-wrap text-sm">{note.content}</p>
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
                      className="h-7 gap-1 text-xs text-destructive opacity-0 transition-opacity group-hover:opacity-100"
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
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
