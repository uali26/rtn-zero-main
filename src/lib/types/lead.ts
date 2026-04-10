export type LeadStatus =
  | "CONTACT_FORM"
  | "MEETING_SCHEDULED"
  | "DECISION"
  | "NEW"
  | "CONTACTED"
  | "DEMO"
  | "CONVERTED"
  | "LOST";

export interface LeadNote {
  id: string;
  leadId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadWithNotes {
  id: string;
  businessName: string;
  email: string;
  phone: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  postcode: string;
  country: string;
  posVendor: string | null;
  smartMeter: boolean;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  notes: LeadNote[];
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  CONTACT_FORM: "Contact Form",
  MEETING_SCHEDULED: "Meeting Scheduled",
  DECISION: "Decision",
  NEW: "New",
  CONTACTED: "Contacted",
  DEMO: "Demo",
  CONVERTED: "Converted",
  LOST: "Lost",
};

export const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  CONTACT_FORM: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
  CONTACTED: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  MEETING_SCHEDULED: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  DEMO: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  DECISION: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  CONVERTED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  LOST: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};
