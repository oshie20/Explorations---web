import type { ExpenseDraftData } from "@/components/NewExpenseFlow";
import { seedRows, type TableRow } from "@/components/PendingTable";

/** Shown when `submitted-expenses` has never been written to localStorage. */
export const DEMO_SUBMITTED_ROWS: TableRow[] = seedRows.slice(0, 5);

/** Shown when `expense-drafts` has never been written to localStorage. */
export const DEMO_DRAFTS: ExpenseDraftData[] = [
  {
    id: "draft-demo-1",
    amount: "425.50",
    type: "Expense request",
    dueDate: "2026-05-01",
    category: "Travel",
    items: [{ name: "Flight SFO–JFK", amount: "425.50", quantity: "1" }],
    description: "Conference travel for the spring leadership summit.",
    attachments: [{ name: "itinerary.pdf", kind: "pdf" }],
    updatedAt: "2026-04-17T14:20:00.000Z",
  },
  {
    id: "draft-demo-2",
    amount: "89.20",
    type: "Expense request",
    dueDate: "2026-04-25",
    category: "Food & dining",
    items: [{ name: "Team dinner", amount: "89.20", quantity: "1" }],
    description: "Quarterly planning dinner — 6 attendees.",
    attachments: [],
    updatedAt: "2026-04-16T09:45:00.000Z",
  },
  {
    id: "draft-demo-3",
    amount: "1,240.00",
    type: "Reimbursement",
    dueDate: "2026-05-10",
    category: "Accommodation",
    items: [{ name: "Hotel — 3 nights", amount: "1,240.00", quantity: "1" }],
    description: "Client workshop lodging; corporate rate confirmation pending.",
    attachments: [{ name: "folio_preview.pdf", kind: "pdf" }],
    updatedAt: "2026-04-14T18:00:00.000Z",
  },
  {
    id: "draft-demo-4",
    amount: "312.00",
    type: "Expense request",
    dueDate: "2026-04-30",
    category: "Software",
    items: [
      { name: "Annual license", amount: "260.00", quantity: "1" },
      { name: "Support add-on", amount: "52.00", quantity: "1" },
    ],
    description: "Design tool renewal for the product team.",
    attachments: [{ name: "invoice_q2.png", kind: "image" }],
    updatedAt: "2026-04-12T11:30:00.000Z",
  },
  {
    id: "draft-demo-5",
    amount: "67.45",
    type: "Reimbursement",
    dueDate: "2026-04-22",
    category: "Transportation",
    items: [{ name: "Airport rides", amount: "67.45", quantity: "1" }],
    description: "Round-trip rides to SFO for board meeting.",
    attachments: [{ name: "receipts.csv", kind: "csv" }],
    updatedAt: "2026-04-10T08:15:00.000Z",
  },
];
