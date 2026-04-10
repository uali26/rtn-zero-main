"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Loader2,
  ArrowUpDown,
  MapPin,
  Phone,
  StickyNote,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { LeadWithNotes, LeadStatus } from "@/lib/types/lead";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types/lead";

interface LeadTableProps {
  leads: LeadWithNotes[];
  loading: boolean;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  onManageLead: (lead: LeadWithNotes) => void;
}

const ALL_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACT_FORM",
  "CONTACTED",
  "MEETING_SCHEDULED",
  "DEMO",
  "DECISION",
  "CONVERTED",
  "LOST",
];

export function LeadTable({
  leads,
  loading,
  onStatusChange,
  onManageLead,
}: LeadTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const columns = useMemo<ColumnDef<LeadWithNotes>[]>(
    () => [
      {
        id: "expand",
        header: "",
        size: 40,
        cell: ({ row }) => (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleRow(row.original.id);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <motion.div
              animate={{ rotate: expandedId === row.original.id ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </button>
        ),
      },
      {
        accessorKey: "businessName",
        header: "Business Name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.businessName}</p>
            <p className="text-sm text-muted-foreground">
              {row.original.city}, {row.original.postcode}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div>
            <p>{row.original.email}</p>
            {row.original.phone && (
              <p className="text-sm text-muted-foreground">
                {row.original.phone}
              </p>
            )}
          </div>
        ),
      },
      {
        accessorKey: "posVendor",
        header: "POS Vendor",
        cell: ({ row }) => (
          <span className="capitalize">{row.original.posVendor || "—"}</span>
        ),
      },
      {
        accessorKey: "smartMeter",
        header: "Smart Meter",
        cell: ({ row }) => (
          <Badge variant={row.original.smartMeter ? "default" : "secondary"}>
            {row.original.smartMeter ? "Yes" : "No"}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div onClick={(e) => e.stopPropagation()}>
            <Select
              value={row.original.status}
              onValueChange={(v) =>
                onStatusChange(row.original.id, v as LeadStatus)
              }
            >
              <SelectTrigger className="h-9 w-44 border-transparent bg-transparent hover:border-border hover:bg-muted/50 focus:border-border">
                <SelectValue>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[row.original.status]}`}
                  >
                    {STATUS_LABELS[row.original.status]}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {ALL_STATUSES.map((s) => (
                  <SelectItem
                    key={s}
                    value={s}
                    className="focus:bg-muted focus:text-foreground"
                  >
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[s]}`}
                    >
                      {STATUS_LABELS[s]}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="-ml-3 h-8 gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
          >
            Created
            <ArrowUpDown className="h-3.5 w-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {new Date(row.original.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onStatusChange, expandedId]
  );

  const table = useReactTable({
    data: leads,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="hover:bg-transparent">
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80"
                  style={
                    header.column.getSize() !== 150
                      ? { width: header.column.getSize() }
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-40 text-center"
              >
                <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-40 text-center text-muted-foreground"
              >
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => {
              const lead = row.original;
              const isExpanded = expandedId === lead.id;
              const recentNotes = lead.notes.slice(0, 2);

              return (
                <Fragment key={row.id}>
                  {/* Main Row */}
                  <TableRow
                    className="cursor-pointer transition-colors hover:bg-primary/5 dark:hover:bg-primary/10"
                    onClick={() => toggleRow(lead.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Accordion Expansion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <tr>
                        <td colSpan={columns.length} className="p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.3, ease: "easeInOut" },
                              opacity: { duration: 0.2 },
                            }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-border/30 bg-muted/30 px-6 py-5">
                              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                                {/* Left: Address & Phone */}
                                <div className="flex-1 space-y-3">
                                  <div className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                    <div>
                                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Full Address
                                      </p>
                                      <p className="mt-0.5 text-sm">
                                        {lead.addressLine1}
                                        {lead.addressLine2
                                          ? `, ${lead.addressLine2}`
                                          : ""}
                                        <br />
                                        {lead.city}, {lead.postcode},{" "}
                                        {lead.country}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                    <div>
                                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Phone
                                      </p>
                                      <p className="mt-0.5 text-sm">
                                        {lead.phone || "Not provided"}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Center: Recent Notes */}
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <StickyNote className="h-4 w-4" />
                                    <p className="text-xs font-semibold uppercase tracking-wide">
                                      Recent Notes
                                    </p>
                                  </div>
                                  {recentNotes.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                      No notes yet.
                                    </p>
                                  ) : (
                                    recentNotes.map((note) => (
                                      <div
                                        key={note.id}
                                        className="rounded-md border border-border/40 bg-background p-2.5"
                                      >
                                        <p className="line-clamp-2 text-sm leading-relaxed">
                                          {note.content}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                          {new Date(
                                            note.createdAt
                                          ).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                          })}
                                        </p>
                                      </div>
                                    ))
                                  )}
                                  {lead.notes.length > 2 && (
                                    <p className="text-xs text-muted-foreground">
                                      +{lead.notes.length - 2} more note
                                      {lead.notes.length - 2 !== 1 ? "s" : ""}
                                    </p>
                                  )}
                                </div>

                                {/* Right: Action */}
                                <div className="flex shrink-0 items-start">
                                  <Button
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onManageLead(lead);
                                    }}
                                    className="gap-1.5"
                                  >
                                    <Settings className="h-3.5 w-3.5" />
                                    Manage Lead
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </Fragment>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
