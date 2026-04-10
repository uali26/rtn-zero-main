"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Pencil, Loader2 } from "lucide-react";
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
  onEdit: (lead: LeadWithNotes) => void;
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
  onEdit,
}: LeadTableProps) {
  const columns = useMemo<ColumnDef<LeadWithNotes>[]>(
    () => [
      {
        accessorKey: "businessName",
        header: "Business Name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.businessName}</p>
            <p className="text-xs text-muted-foreground">
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
            <p className="text-sm">{row.original.email}</p>
            {row.original.phone && (
              <p className="text-xs text-muted-foreground">
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
          <span className="text-sm capitalize">
            {row.original.posVendor || "—"}
          </span>
        ),
      },
      {
        accessorKey: "smartMeter",
        header: "Smart Meter",
        cell: ({ row }) => (
          <Badge
            variant={row.original.smartMeter ? "default" : "secondary"}
            className="text-xs"
          >
            {row.original.smartMeter ? "Yes" : "No"}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Select
            value={row.original.status}
            onValueChange={(v) =>
              onStatusChange(row.original.id, v as LeadStatus)
            }
          >
            <SelectTrigger className="h-8 w-[160px] text-xs">
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
                <SelectItem key={s} value={s}>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[s]}`}
                  >
                    {STATUS_LABELS[s]}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {new Date(row.original.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row.original)}
            className="h-8 gap-1.5 text-xs"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        ),
      },
    ],
    [onStatusChange, onEdit]
  );

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
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
              <TableCell colSpan={columns.length} className="h-40 text-center">
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
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="transition-colors hover:bg-muted/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
