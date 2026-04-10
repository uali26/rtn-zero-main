"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw, Users, CalendarDays, X } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { LeadTable } from "@/components/admin/LeadTable";
import { LeadDrawer } from "@/components/admin/LeadDrawer";
import type { LeadWithNotes, LeadStatus } from "@/lib/types/lead";

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "ALL", label: "All Statuses" },
  { value: "CONTACT_FORM", label: "Contact Form" },
  { value: "MEETING_SCHEDULED", label: "Meeting Scheduled" },
  { value: "DECISION", label: "Decision" },
  { value: "CONVERTED", label: "Converted" },
  { value: "LOST", label: "Lost" },
];

export default function AdminDashboard() {
  const [leads, setLeads] = useState<LeadWithNotes[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLead, setSelectedLead] = useState<LeadWithNotes | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (dateFrom) params.set("from", dateFrom.toISOString());
      if (dateTo) params.set("to", dateTo.toISOString());
      params.set("page", String(page));
      params.set("limit", "25");

      const res = await fetch(`/api/admin/leads?${params}`);
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data.leads);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, dateFrom, dateTo, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status } : prev));
    }
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        // Revert on failure
        fetchLeads();
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleOpenDrawer = (lead: LeadWithNotes) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const handleNoteSaved = (leadId: string, notes: LeadWithNotes["notes"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, notes } : l))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, notes } : prev));
    }
  };

  const clearDateFilter = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setPage(1);
  };

  return (
    <>
      {/* Page Title Bar */}
      <div className="border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Lead Management
              </h1>
              <p className="text-sm text-muted-foreground">
                {total} lead{total !== 1 ? "s" : ""} total
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by business name, email, or postcode..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-10 pl-10 text-sm"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v ?? "ALL");
              setPage(1);
            }}
          >
            <SelectTrigger className="h-10 w-full text-sm sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <div className="flex items-center gap-1.5">
            <Popover>
              <PopoverTrigger
                className="inline-flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-normal hover:bg-muted"
              >
                <CalendarDays className="h-4 w-4" />
                {dateFrom
                  ? format(dateFrom, "dd MMM")
                  : "From"}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={(d) => { setDateFrom(d ?? undefined); setPage(1); }}
                />
              </PopoverContent>
            </Popover>
            <span className="text-muted-foreground">–</span>
            <Popover>
              <PopoverTrigger
                className="inline-flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-normal hover:bg-muted"
              >
                <CalendarDays className="h-4 w-4" />
                {dateTo
                  ? format(dateTo, "dd MMM")
                  : "To"}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={(d) => { setDateTo(d ?? undefined); setPage(1); }}
                />
              </PopoverContent>
            </Popover>
            {(dateFrom || dateTo) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearDateFilter}
                className="h-10 px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <LeadTable
          leads={leads}
          loading={loading}
          onStatusChange={handleStatusChange}
          onManageLead={handleOpenDrawer}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Lead Drawer */}
      <LeadDrawer
        lead={selectedLead}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onNoteSaved={handleNoteSaved}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}
