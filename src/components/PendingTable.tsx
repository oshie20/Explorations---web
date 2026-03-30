
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ExpenseDraftData } from "./NewExpenseFlow";

function InvoiceIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9.3229V4.02713C2 2.60013 2 1.88663 2.43934 1.44332C2.87868 1 3.58579 1 5 1H7C8.4142 1 9.1213 1 9.56065 1.44332C10 1.88663 10 2.60013 10 4.02713V9.3229C10 10.0787 10 10.4567 9.769 10.6054C9.39155 10.8486 8.80805 10.3387 8.51455 10.1537C8.27205 10.0007 8.15085 9.92425 8.01625 9.91985C7.87085 9.91505 7.74745 9.9884 7.48545 10.1537L6.53 10.7562C6.27225 10.9187 6.1434 11 6 11C5.8566 11 5.72775 10.9187 5.47 10.7562L4.51456 10.1537C4.27207 10.0007 4.15083 9.92425 4.01626 9.91985C3.87086 9.91505 3.74747 9.9884 3.48544 10.1537C3.19197 10.3387 2.60843 10.8486 2.23097 10.6054C2 10.4567 2 10.0787 2 9.3229Z" />
      <path d="M5.5 5.5H4" />
      <path d="M7 3.5H4" />
    </svg>
  );
}

function DashboardSquareIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.84515 9.72835C6.75 9.49865 6.75 9.20745 6.75 8.625C6.75 8.04255 6.75 7.75135 6.84515 7.52165C6.972 7.21535 7.21535 6.972 7.52165 6.84515C7.75135 6.75 8.04255 6.75 8.625 6.75C9.20745 6.75 9.49865 6.75 9.72835 6.84515C10.0346 6.972 10.278 7.21535 10.4049 7.52165C10.5 7.75135 10.5 8.04255 10.5 8.625C10.5 9.20745 10.5 9.49865 10.4049 9.72835C10.278 10.0346 10.0346 10.278 9.72835 10.4049C9.49865 10.5 9.20745 10.5 8.625 10.5C8.04255 10.5 7.75135 10.5 7.52165 10.4049C7.21535 10.278 6.972 10.0346 6.84515 9.72835Z" strokeLinecap="square" />
      <path d="M6.84515 4.47835C6.75 4.24864 6.75 3.95742 6.75 3.375C6.75 2.79258 6.75 2.50136 6.84515 2.27165C6.972 1.96536 7.21535 1.72202 7.52165 1.59515C7.75135 1.5 8.04255 1.5 8.625 1.5C9.20745 1.5 9.49865 1.5 9.72835 1.59515C10.0346 1.72202 10.278 1.96536 10.4049 2.27165C10.5 2.50136 10.5 2.79258 10.5 3.375C10.5 3.95742 10.5 4.24864 10.4049 4.47835C10.278 4.78464 10.0346 5.028 9.72835 5.15485C9.49865 5.25 9.20745 5.25 8.625 5.25C8.04255 5.25 7.75135 5.25 7.52165 5.15485C7.21535 5.028 6.972 4.78464 6.84515 4.47835Z" strokeLinecap="square" />
      <path d="M1.59515 9.72835C1.5 9.49865 1.5 9.20745 1.5 8.625C1.5 8.04255 1.5 7.75135 1.59515 7.52165C1.72202 7.21535 1.96536 6.972 2.27165 6.84515C2.50136 6.75 2.79258 6.75 3.375 6.75C3.95742 6.75 4.24864 6.75 4.47835 6.84515C4.78464 6.972 5.028 7.21535 5.15485 7.52165C5.25 7.75135 5.25 8.04255 5.25 8.625C5.25 9.20745 5.25 9.49865 5.15485 9.72835C5.028 10.0346 4.78464 10.278 4.47835 10.4049C4.24864 10.5 3.95742 10.5 3.375 10.5C2.79258 10.5 2.50136 10.5 2.27165 10.4049C1.96536 10.278 1.72202 10.0346 1.59515 9.72835Z" strokeLinecap="square" />
      <path d="M1.59515 4.47835C1.5 4.24864 1.5 3.95742 1.5 3.375C1.5 2.79258 1.5 2.50136 1.59515 2.27165C1.72202 1.96536 1.96536 1.72202 2.27165 1.59515C2.50136 1.5 2.79258 1.5 3.375 1.5C3.95742 1.5 4.24864 1.5 4.47835 1.59515C4.78464 1.72202 5.028 1.96536 5.15485 2.27165C5.25 2.50136 5.25 2.79258 5.25 3.375C5.25 3.95742 5.25 4.24864 5.15485 4.47835C5.028 4.78464 4.78464 5.028 4.47835 5.15485C4.24864 5.25 3.95742 5.25 3.375 5.25C2.79258 5.25 2.50136 5.25 2.27165 5.15485C1.96536 5.028 1.72202 4.78464 1.59515 4.47835Z" strokeLinecap="square" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.25 8.25V4.25C10.25 3.07149 10.25 2.48224 9.88386 2.11612C9.51776 1.75 8.92851 1.75 7.75001 1.75H4.25C3.07149 1.75 2.48223 1.75 2.11611 2.11612C1.75 2.48224 1.75 3.07149 1.75 4.25V8.25" />
      <path d="M10.9921 10.25H1.0079C0.816426 10.25 0.691896 10.0544 0.777526 9.8882L1.75 8.25H10.25L11.2225 9.8882C11.3081 10.0544 11.1836 10.25 10.9921 10.25Z" />
    </svg>
  );
}

function PendingSparkIcon() {
  return (
    <img src="/loading-03.svg" alt="" width={12} height={12} className="shrink-0" />
  );
}

function AirplaneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4.75L2.63765 2.23781C2.42852 2.01223 2.46201 1.84746 2.70864 1.70481C3.17227 1.43663 3.53344 1.42935 4.02214 1.69754L6.4745 3.04336C6.6491 3.13916 6.8203 3.23628 7 3.28926" />
      <path d="M6.25 6.8316L7.30515 10.2348C7.3913 10.5127 7.543 10.5632 7.778 10.4284C8.2198 10.1751 8.3979 9.8825 8.40985 9.35535L8.46975 6.7099C8.47775 6.35655 8.4763 6.01075 8.75 5.75" />
      <path d="M4.16423 5.49214L5.1077 4.80277L7.3218 3.18852C7.3218 3.18852 8.13925 2.58795 8.59595 2.38789C9.13825 2.15032 9.64345 2.26077 10.187 2.41256C10.4681 2.49108 10.6087 2.53033 10.7101 2.60357C10.871 2.71978 10.9757 2.89863 10.9972 3.09425C11.0108 3.21754 10.9749 3.35728 10.9033 3.63677C10.7647 4.17713 10.6091 4.66408 10.1294 5.00874C9.72545 5.29899 8.78965 5.69729 8.78965 5.69729L6.26585 6.78224L5.1891 7.24379C4.7987 7.41114 4.6035 7.49479 4.4707 7.65009C4.15967 8.01374 4.11574 8.67188 3.99966 9.12468C3.93551 9.37488 3.58374 9.80854 3.27029 9.74344C3.07678 9.70324 3.07307 9.46099 3.04898 9.30654L2.8171 7.81944C2.76165 7.46379 2.7574 7.45654 2.473 7.23134L1.28379 6.28964C1.16027 6.19179 0.949516 6.06749 1.011 5.88204C1.1106 5.58164 1.66704 5.49784 1.91874 5.56814C2.37417 5.69534 2.97374 5.98689 3.44842 5.90289C3.6511 5.86704 3.82215 5.74209 4.16423 5.49214Z" />
    </svg>
  );
}

type Category = "Travel" | "Utilities" | "Event" | "Software" | "Other";
type EntryType = "Expense" | "Reimbursement";

interface TableRow {
  date: string;
  requester: string;
  initials: string;
  color: string;
  type: EntryType;
  amount: string;
  category: Category;
}

const rows: TableRow[] = [
  {
    date: "1/01/26",
    requester: "olivia.harris@designhub.com",
    initials: "OH",
    color: "#f97316",
    type: "Expense",
    amount: "$1,250.00",
    category: "Travel",
  },
  {
    date: "8/01/26",
    requester: "ziar@designhub.com",
    initials: "ZI",
    color: "#8b5cf6",
    type: "Expense",
    amount: "$1,500.00",
    category: "Utilities",
  },
  {
    date: "4/01/26",
    requester: "marcus.james@designhub.com",
    initials: "MJ",
    color: "#14b8a6",
    type: "Reimbursement",
    amount: "$1,750.00",
    category: "Event",
  },
  {
    date: "8/01/26",
    requester: "sophia.kim@designhub.com",
    initials: "SK",
    color: "#ec4899",
    type: "Reimbursement",
    amount: "$2,000.00",
    category: "Software",
  },
  {
    date: "11/01/26",
    requester: "liam.watson@designhub.com",
    initials: "LW",
    color: "#6573f9",
    type: "Reimbursement",
    amount: "$2,250.00",
    category: "Other",
  },
  {
    date: "7/01/26",
    requester: "ava.smith@designhub.com",
    initials: "AS",
    color: "#22c55e",
    type: "Reimbursement",
    amount: "$2,500.00",
    category: "Utilities",
  },
];

const categoryIcon: Record<Category, React.ReactNode> = {
  Travel: <AirplaneIcon />,
  Utilities: <InvoiceIcon />,
  Event: <DashboardSquareIcon />,
  Software: <LaptopIcon />,
  Other: <DashboardSquareIcon />,
};

function avatarForRequester(requester: string) {
  // Map row requester -> Figma avatar images (copied into /public).
  switch (requester) {
    case "olivia.harris@designhub.com":
      return "/avatar-olivia.png";
    case "ziar@designhub.com":
      return "/avatar-ziar.png";
    case "marcus.james@designhub.com":
      return "/avatar-marcus.png";
    case "sophia.kim@designhub.com":
      return "/avatar-sophia.png";
    case "liam.watson@designhub.com":
      return "/avatar-liam.png";
    case "ava.smith@designhub.com":
      return "/avatar-ava.png";
    default:
      return null;
  }
}

function getNotesAndAttachments(row: TableRow): { notesText: string; attachments: string[] } {
  const handle = row.requester.split("@")[0]?.replace(/\./g, "_") ?? "requester";

  const byCategory: Record<
    Category,
    { expense: { notes: string; files: string[] }; reimbursement: { notes: string; files: string[] } }
  > = {
    Travel: {
      expense: {
        notes:
          "Round-trip LAX–SFO for the February product sync. Corporate rate at the Marriott Financial District; no per diem claimed. Trip aligns with the approved travel calendar for Design.",
        files: [
          `itinerary_${handle}_united.pdf`,
          "hotel_folio_marriott.pdf",
          "corp_card_authorization.png",
        ],
      },
      reimbursement: {
        notes:
          "Same-day return flight change after the client workshop ran over. Paid on a personal card because the corporate portal timed out. Full itinerary and fare difference receipt attached.",
        files: [
          "flight_change_receipt.pdf",
          `boarding_pass_${handle}.pdf`,
          "expense_policy_ack.txt",
        ],
      },
    },
    Utilities: {
      expense: {
        notes:
          "Quarterly HVAC service for the downtown office (Suite 400). Includes filter swap, refrigerant check, and written compliance summary for facilities. PO reference: FAC-UTIL-2026-Q1.",
        files: ["service_contract_summary.pdf", `work_order_signed_${handle}.pdf`, "vendor_W9.pdf"],
      },
      reimbursement: {
        notes:
          "Emergency after-hours leak repair at the WeHo satellite—building management required immediate payment on site. Technician left a stamped completion slip; photos of the work area included.",
        files: [
          "after_hours_invoice.pdf",
          "technician_completion_slip.jpg",
          `site_photos_${handle}.zip`,
        ],
      },
    },
    Event: {
      expense: {
        notes:
          "Deposit for the Q1 leadership offsite: venue hold, basic A/V package, and room block release terms. Final balance is due fourteen days before the event; cancellation policy is in the contract rider.",
        files: ["venue_contract_offsite.pdf", "deposit_wire_confirmation.pdf", "event_run_of_show_draft.docx"],
      },
      reimbursement: {
        notes:
          "Rush printing and foam-core signage for the partner summit—the vendor could not invoice Stratus directly on short notice. Line items match the approved mockups in the brand folder.",
        files: [
          `print_invoice_vista_${handle}.pdf`,
          "signage_proofs.png",
          "delivery_confirmation.pdf",
        ],
      },
    },
    Software: {
      expense: {
        notes:
          "Annual design-tool renewal (15 seats). Procurement ticket is filed under STR-8821; this matches last year’s seat count plus two net-new hires in Product Design.",
        files: ["vendor_quote_signed.pdf", "seat_allocation_q1.csv", "order_confirmation_email.eml"],
      },
      reimbursement: {
        notes:
          "Temporary upgrade on a personal Figma plan during the design jam week. Org license migration is scheduled for next billing cycle—this submission covers the gap only.",
        files: [
          `personal_invoice_figma_${handle}.pdf`,
          "screenshot_account_seats.png",
        ],
      },
    },
    Other: {
      expense: {
        notes:
          "Facilities OPEX purchase: ergonomic monitor arms and cable kits for the hot-desk pods. Receipt shows tax breakdown; items match the approved facilities punch list from Jan 12.",
        files: ["supplier_invoice_amazon_business.pdf", `packing_slip_${handle}.pdf`],
      },
      reimbursement: {
        notes:
          "FedEx overnight and Saturday pickup for the board deck print run. Cardholder submitted itemized receipts; shipping tied to the Jan board meeting materials package.",
        files: [
          "fedex_commercial_invoice.pdf",
          `shipping_labels_${handle}.pdf`,
          "itemized_card_receipt.pdf",
        ],
      },
    },
  };

  const bucket = row.type === "Expense" ? "expense" : "reimbursement";
  const { notes, files } = byCategory[row.category][bucket];
  return { notesText: notes, attachments: files };
}

interface PendingTableProps {
  draftItems?: ExpenseDraftData[];
  onOpenDraft?: (draft: ExpenseDraftData) => void;
}

export function PendingTable({ draftItems = [], onOpenDraft }: PendingTableProps) {
  const [activeTab, setActiveTab] = useState("Pending requests");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  function openDetails(row: TableRow) {
    // Force the drawer to animate even if another row is opened quickly.
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setSelectedRow(row);
    setDrawerMounted(true);
    setDetailsOpen(false);
    requestAnimationFrame(() => setDetailsOpen(true));
  }

  function closeDetails() {
    if (closeTimerRef.current) return;
    setDetailsOpen(false);

    // Keep mounted long enough for slide-out transition to play.
    closeTimerRef.current = window.setTimeout(() => {
      setSelectedRow(null);
      setDrawerMounted(false);
      closeTimerRef.current = null;
    }, 430);
  }

  useEffect(() => {
    if (!detailsOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDetails();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detailsOpen]);

  useEffect(() => {
    if (!drawerMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerMounted]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, []);

  function formatOrdinal(day: number): string {
    if (day % 100 >= 11 && day % 100 <= 13) return `${day}th`;
    const mod = day % 10;
    if (mod === 1) return `${day}st`;
    if (mod === 2) return `${day}nd`;
    if (mod === 3) return `${day}rd`;
    return `${day}th`;
  }

  function formatDueDate(dateStr: string): string {
    // dateStr like "1/31/26" or "1/01/26"
    const parts = dateStr.split("/").map((p) => Number(p));
    if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return dateStr;
    const [a, b, c] = parts;
    // Heuristic: if first part > 12, it's day/month/year; else month/day/year.
    const month = a > 12 ? b : a;
    const day = a > 12 ? a : b;
    const year = 2000 + c;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const m = monthNames[Math.max(0, Math.min(monthNames.length - 1, month - 1))] ?? "—";
    return `${m} ${formatOrdinal(day)}, ${year}`;
  }

  function formatRequesterName(email: string): string {
    // "olivia.harris@designhub.com" -> "Olivia harris"
    const local = email.split("@")[0] ?? email;
    const pieces = local.split(/[._-]/g).filter(Boolean);
    if (pieces.length === 0) return local;
    const first = pieces[0].slice(0, 1).toUpperCase() + pieces[0].slice(1);
    const rest = pieces.slice(1).join(" ").toLowerCase();
    return rest ? `${first} ${rest}` : first;
  }

  function parseCurrencyAmount(v: string): number {
    // "$1,240.00" -> 1240
    const cleaned = v.replace(/[^0-9.]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  }

  function hashString(s: string): number {
    // Deterministic lightweight hash for stable IDs.
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0; // force 32-bit
    }
    return Math.abs(h);
  }

  function buildExpenseId(row: TableRow): string {
    const base = `${row.date}|${row.requester}|${row.amount}|${row.type}|${row.category}`;
    const n = hashString(base) % 100000000; // 8 digits
    return `EXP ${String(n).padStart(8, "0")}`;
  }

  const expenseId = selectedRow ? buildExpenseId(selectedRow) : "";
  const dueDate = selectedRow ? formatDueDate(selectedRow.date) : "";
  const requesterName = selectedRow ? formatRequesterName(selectedRow.requester) : "";

  const breakdownItems = selectedRow
    ? (() => {
        const total = parseCurrencyAmount(selectedRow.amount);
        const round2 = (x: number) => Math.round(x * 100) / 100;

        // Allocate the total across 3 line items, and keep qty consistent with the UI.
        const laborUnit = round2(total * 0.2); // Labor x 1
        const airUnit = round2((total * 0.2) / 4); // Air filter x 4
        const thermostatUnit = round2(total - laborUnit - airUnit * 4); // Remaining x 1

        return [
          { name: "Thermostat replacement", unit: thermostatUnit, qty: 1 },
          { name: "Air filter replacement", unit: airUnit, qty: 4 },
          { name: "Labor", unit: laborUnit, qty: 1 },
        ];
      })()
    : [];

  const { notesText, attachments } = selectedRow
    ? getNotesAndAttachments(selectedRow)
    : { notesText: "", attachments: [] as string[] };

  const approveLabel = selectedRow?.type === "Expense" ? "Approve Expense" : "Approve Reimbursement";
  const rejectLabel = selectedRow?.type === "Expense" ? "Reject expense" : "Reject reimbursement";

  return (
    <div className="bg-white overflow-hidden" style={{ borderRadius: "16px", boxShadow: "0 2px 2px rgba(0,0,0,0.02)" }}>
      {/* Tabs */}
      <div className="flex items-center gap-4 sm:gap-6 border-b border-[#EDEFF4] overflow-x-auto">
        {["Pending requests", "Drafts", "Reports", "Budget & spending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={
              tab === activeTab
                ? "py-3 px-1 text-xs sm:text-sm font-medium text-[#3e50f7] border-b-2 border-[#3e50f7] -mb-px whitespace-nowrap shrink-0"
                : "py-3 px-1 text-xs sm:text-sm font-normal text-[#808897] hover:text-[#272835] transition-colors whitespace-nowrap shrink-0"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      {activeTab === "Pending requests" && (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#EDEFF4]">
              <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835] w-24 sm:w-28">Date</th>
              <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835] min-w-[140px]">
                <div className="flex items-center gap-1">
                  Requester
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-[#272835]"
                  >
                    <path
                      d="M4 5l2-2 2 2M4 7l2 2 2-2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </th>
              <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835] w-28 sm:w-36 min-w-[80px]">Type</th>
              <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835] w-24 sm:w-32">Amount</th>
              <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835] w-28 sm:w-36 min-w-[80px]">Category</th>
              <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835] w-20 sm:w-28">Status</th>
              <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835] w-16 sm:w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#EDEFF4] last:border-0 hover:bg-[#fafafa] transition-colors cursor-pointer"
                onClick={() => openDetails(row)}
              >
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-[#272835] text-xs sm:text-sm">{row.date}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4">
                  <div className="flex items-center gap-2.5">
                    {avatarForRequester(row.requester) ? (
                      <img
                        src={avatarForRequester(row.requester) as string}
                        alt={row.requester}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                        style={{ backgroundColor: row.color }}
                      >
                        {row.initials}
                      </div>
                    )}
                    <span className="text-[#272835] text-xs sm:text-sm truncate max-w-[140px] sm:max-w-none">{row.requester}</span>
                  </div>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 text-[#272835] text-xs sm:text-sm">{row.type}</td>
                <td className="px-3 sm:px-4 py-3 sm:py-4 font-medium text-[#272835] text-xs sm:text-sm">
                  {row.amount}
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#f4f5f8] text-[#272835] text-xs font-medium">
                    {categoryIcon[row.category]}
                    {row.category}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#FFF4F0] text-[#DE4613] text-xs font-medium">
                    <PendingSparkIcon />
                    Pending
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3 sm:py-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetails(row);
                    }}
                    className="text-xs font-medium text-[#3e50f7] hover:text-[#6573f9] transition-colors px-2 py-1 rounded hover:bg-[#f0f2ff]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {activeTab === "Drafts" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#EDEFF4]">
                <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835]">Last updated</th>
                <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835]">Amount</th>
                <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835]">Category</th>
                <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835]">Due date</th>
                <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835]">Description</th>
                <th className="text-left px-3 sm:px-4 py-3 text-xs font-medium text-[#272835]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {draftItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-sm text-[#808897]">
                    No drafts yet. Save one from the new expense flow.
                  </td>
                </tr>
              ) : (
                draftItems.map((draft, idx) => (
                  <tr key={`${draft.updatedAt}-${idx}`} className="border-b border-[#EDEFF4] last:border-0">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-[#272835] text-xs sm:text-sm">
                      {new Date(draft.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-[#272835] text-xs sm:text-sm">
                      {draft.amount ? `$${draft.amount}` : "$0.00"}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-[#272835] text-xs sm:text-sm">{draft.category}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-[#272835] text-xs sm:text-sm">{draft.dueDate}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-[#272835] text-xs sm:text-sm max-w-[260px] truncate">{draft.description}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <button
                        type="button"
                        onClick={() => onOpenDraft?.(draft)}
                        className="text-xs font-medium text-[#3e50f7] hover:text-[#6573f9] transition-colors px-2 py-1 rounded hover:bg-[#f0f2ff]"
                      >
                        Continue
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {(activeTab === "Reports" || activeTab === "Budget & spending") && (
        <div className="px-4 py-8 text-sm text-[#808897]">No data available in this tab yet.</div>
      )}

      {/* Details drawer */}
      {drawerMounted && selectedRow && createPortal(
        <div className="fixed inset-0 z-[200] isolate">
          <div
            className={
              "fixed inset-0 z-0 bg-black/40 transition-opacity duration-[430ms] ease-[cubic-bezier(0.22,1,0.36,1)] " +
              (detailsOpen ? "opacity-100" : "opacity-0 pointer-events-none")
            }
            onClick={closeDetails}
            aria-hidden
          />
          <div
            className={
              "fixed top-0 bottom-0 right-0 z-10 flex h-full max-h-[100dvh] w-full flex-col overflow-hidden bg-white border-l border-[#EDEFF4] md:w-[520px] md:rounded-none " +
              "transform transition-all duration-[430ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform " +
              (detailsOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")
            }
            role="dialog"
            aria-modal="true"
          >
            <div className="shrink-0 border-b border-[#EDEFF4] px-4 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-[#272835]">Expense details</h3>
                  <p className="text-xs text-[#808897] font-medium mt-1">{expenseId}</p>
                </div>

                <button
                  type="button"
                  onClick={closeDetails}
                  className="w-10 h-10 flex items-center justify-center text-[#808897] hover:bg-[#f4f5f8] transition-colors rounded-lg"
                  aria-label="Close details"
                >
                  <img src="/x-close.svg" alt="" width="16" height="16" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-white [-webkit-overflow-scrolling:touch]">
            <div className="px-4 sm:px-6 py-4 space-y-5 pb-8">
              {/* Total amount + breakdown + Type/Due/Requested (combined card) */}
              <div className="border border-[#EDEFF4] rounded-[14px] overflow-hidden bg-white">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#808897] font-medium">Total amount</p>
                    <p className="text-sm font-semibold text-[#272835]">{selectedRow.amount}</p>
                  </div>

                  <div className="mt-3 rounded-[14px] bg-[#FAFBFD] p-4 border border-[#EDEFF4]">
                    <div className="space-y-3">
                      {breakdownItems.map((it) => (
                        <div key={it.name} className="space-y-1">
                          <p className="text-sm text-[#808897]">{it.name}</p>
                          <p className="text-sm font-medium text-[#272835]">
                            {it.unit.toLocaleString(undefined, { style: "currency", currency: "USD" })} x {it.qty}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#EDEFF4]" />

                <div className="p-5 flex items-center justify-between bg-white">
                  <p className="text-sm text-[#808897] font-medium">Type:</p>
                  <p className="text-sm font-semibold text-[#272835]">{selectedRow.type}</p>
                </div>
                <div className="p-5 flex items-center justify-between bg-white border-t border-[#EDEFF4]">
                  <p className="text-sm text-[#808897] font-medium">Due date:</p>
                  <p className="text-sm font-semibold text-[#272835]">{dueDate}</p>
                </div>
                <div className="p-5 flex items-center justify-between bg-white border-t border-[#EDEFF4]">
                  <p className="text-sm text-[#808897] font-medium">Requested by:</p>
                  <div className="flex items-center gap-2">
                    {avatarForRequester(selectedRow.requester) ? (
                      <img
                        src={avatarForRequester(selectedRow.requester) as string}
                        alt={selectedRow.requester}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-semibold"
                        style={{ backgroundColor: selectedRow.color }}
                      >
                        {selectedRow.initials}
                      </div>
                    )}
                    <p className="text-sm font-semibold text-[#272835] whitespace-nowrap">{requesterName}</p>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between bg-white border-t border-[#EDEFF4]">
                  <p className="text-sm text-[#808897] font-medium">Category:</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#F4F5F8] text-[#272835] text-xs font-medium">
                    {categoryIcon[selectedRow.category]}
                    {selectedRow.category}
                  </span>
                </div>
                <div className="p-5 flex items-center justify-between bg-white border-t border-[#EDEFF4]">
                  <p className="text-sm text-[#808897] font-medium">Status:</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#FFF4F0] text-[#DE4613] text-xs font-medium">
                    <PendingSparkIcon />
                    Pending
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <p className="text-sm text-[#808897] font-medium">Notes</p>
                <div className="border border-[#EDEFF4] rounded-lg p-4 bg-white">
                  <p className="text-sm text-[#272835] leading-5">
                    {notesText}
                  </p>
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <p className="text-sm text-[#272835] font-medium">Attachments</p>
                <div className="flex flex-wrap gap-3">
                  {attachments.map((name, idx) => (
                    <button
                      key={`${name}-${idx}`}
                      type="button"
                      className="flex items-center gap-2 bg-[#F4F5F8] border border-transparent rounded-lg px-3 py-2 text-sm text-[#272835]"
                    >
                      <img src="/group-2.svg" alt="" width="16" height="16" />
                      <span className="font-medium">{name}</span>
                      <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-lg text-[#808897]">
                        <img src="/download-circle-01.svg" alt="" width="16" height="16" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  className="min-h-[44px] rounded-lg border border-[#EDEFF4] text-[#DF1C41] text-sm font-semibold hover:bg-[#f4f5f8] transition-colors"
                >
                  {rejectLabel}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full min-h-[44px] text-white text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    padding: "0 18px",
                    cursor: "pointer",
                    borderRadius: "12px",
                    border: "1px solid #6573F9",
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(355deg, #625AFF 3.89%, #645CFF 95.37%)",
                    boxShadow: "none",
                  }}
                >
                  {approveLabel}
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      , document.body!)}
    </div>
  );
}
