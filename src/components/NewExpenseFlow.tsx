import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getAttachmentIconSrc } from "@/lib/attachmentIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewExpenseFlowProps {
  open: boolean;
  onClose: () => void;
  onSaveDraft?: (draft: ExpenseDraftData) => void;
  onSubmitExpense?: (expense: ExpenseDraftData) => void;
  onSubmitSuccessAcknowledge?: () => void;
  initialDraft?: ExpenseDraftData | null;
}

type Step = "new" | "review";

interface ExpenseDraft {
  amount: string;
  type: string;
  dueDate: string;
  category: string;
  items: DraftItem[];
  description: string;
  attachments: DraftAttachment[];
}

type AttachmentKind = "pdf" | "image" | "csv" | "file";
export interface DraftAttachment {
  name: string;
  kind: AttachmentKind;
}

export interface ExpenseDraftData {
  id: string;
  amount: string;
  type: string;
  dueDate: string;
  category: string;
  items: DraftItem[];
  description: string;
  attachments: DraftAttachment[];
  updatedAt: string;
}

export interface DraftItem {
  name: string;
  amount: string;
  quantity: string;
}

const categories = [
  "Travel",
  "Food & dining",
  "Transportation",
  "Accommodation",
  "Utilities",
  "Software",
  "Event",
  "Office supplies",
  "Other",
] as const;
type Category = (typeof categories)[number];

function AirplaneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.52503 18.075L9.4667 16.4417C9.75837 16.1917 10.2417 16.1917 10.5334 16.4417L12.475 18.075C12.925 18.3 13.475 18.075 13.6417 17.5917L14.0084 16.4833C14.1 16.2167 14.0084 15.825 13.8084 15.625L11.9167 13.725C11.775 13.5917 11.6667 13.325 11.6667 13.1333V10.7583C11.6667 10.4083 11.925 10.2417 12.25 10.375L16.3417 12.1417C16.9834 12.4167 17.5084 12.075 17.5084 11.375V10.3C17.5084 9.74165 17.0917 9.09999 16.575 8.88332L11.9167 6.87499C11.7834 6.81665 11.6667 6.64165 11.6667 6.49165V3.99165C11.6667 3.20832 11.0917 2.28332 10.3917 1.92499C10.1417 1.79999 9.85003 1.79999 9.60003 1.92499C8.90003 2.28332 8.32503 3.21665 8.32503 3.99999V6.49999C8.32503 6.64999 8.20837 6.82499 8.07503 6.88332L3.42503 8.89165C2.90837 9.09999 2.4917 9.74165 2.4917 10.3V11.375C2.4917 12.075 3.0167 12.4167 3.65837 12.1417L7.75003 10.375C8.0667 10.2333 8.33337 10.4083 8.33337 10.7583V13.1333C8.33337 13.325 8.22503 13.5917 8.0917 13.725L6.20003 15.625C6.00003 15.825 5.90837 16.2083 6.00003 16.4833L6.3667 17.5917C6.5167 18.075 7.0667 18.3083 7.52503 18.075Z" />
    </svg>
  );
}

function ReceiptTextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.3333 4.99999V7.01666C18.3333 8.33332 17.4999 9.16666 16.1832 9.16666H13.3333V3.34166C13.3333 2.41666 14.0916 1.66666 15.0166 1.66666C15.9249 1.67499 16.7583 2.04166 17.3583 2.64166C17.9583 3.24999 18.3333 4.08332 18.3333 4.99999Z" />
      <path d="M1.66675 5.83332V17.5C1.66675 18.1917 2.45006 18.5833 3.00006 18.1667L4.42508 17.1C4.75841 16.85 5.22509 16.8833 5.52509 17.1833L6.9084 18.575C7.2334 18.9 7.76677 18.9 8.09177 18.575L9.49176 17.175C9.78343 16.8833 10.2501 16.85 10.5751 17.1L12.0001 18.1667C12.5501 18.575 13.3334 18.1833 13.3334 17.5V3.33332C13.3334 2.41666 14.0834 1.66666 15.0001 1.66666H5.83341H5.00008C2.50008 1.66666 1.66675 3.15832 1.66675 4.99999V5.83332Z" />
      <path d="M5 7.5H10" />
      <path d="M5.625 10.8333H9.375" />
    </svg>
  );
}

function GraphIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.2667 10C17.4333 10 18.3333 9.16667 17.5333 6.43334C16.9917 4.59167 15.4083 3.00834 13.5667 2.46667C10.8333 1.66667 10 2.56667 10 4.73334V7.13334C10 9.16667 10.8333 10 12.5 10H15.2667Z" />
      <path d="M16.6667 12.25C15.8917 16.1083 12.1917 18.9083 7.98336 18.225C4.82502 17.7167 2.28336 15.175 1.76669 12.0167C1.09169 7.82501 3.87502 4.12501 7.71669 3.34167" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.36675 1.66666H14.6251C17.5917 1.66666 18.3334 2.40832 18.3334 5.36666V10.6417C18.3334 13.6083 17.5917 14.3417 14.6334 14.3417H5.36675C2.40841 14.35 1.66675 13.6083 1.66675 10.65V5.36666C1.66675 2.40832 2.40841 1.66666 5.36675 1.66666Z" />
      <path d="M10 14.35V18.3333" />
      <path d="M1.66675 10.8333H18.3334" />
      <path d="M6.25 18.3333H13.75" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5001 1.66669V10C12.5001 10.9167 11.7501 11.6667 10.8334 11.6667H1.66675V5.00002C1.66675 3.15835 3.15841 1.66669 5.00008 1.66669H12.5001Z" />
      <path d="M18.3334 11.6667V14.1667C18.3334 15.55 17.2167 16.6667 15.8334 16.6667H15.0001C15.0001 15.75 14.2501 15 13.3334 15C12.4167 15 11.6667 15.75 11.6667 16.6667H8.33341C8.33341 15.75 7.58341 15 6.66675 15C5.75008 15 5.00008 15.75 5.00008 16.6667H4.16675C2.78341 16.6667 1.66675 15.55 1.66675 14.1667V11.6667H10.8334C11.7501 11.6667 12.5001 10.9167 12.5001 10V4.16669H14.0334C14.6334 4.16669 15.1834 4.4917 15.4834 5.00836L16.9084 7.50002H15.8334C15.3751 7.50002 15.0001 7.87502 15.0001 8.33335V10.8334C15.0001 11.2917 15.3751 11.6667 15.8334 11.6667H18.3334Z" />
      <path d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z" />
      <path d="M13.3334 18.3333C14.2539 18.3333 15.0001 17.5871 15.0001 16.6667C15.0001 15.7462 14.2539 15 13.3334 15C12.4129 15 11.6667 15.7462 11.6667 16.6667C11.6667 17.5871 12.4129 18.3333 13.3334 18.3333Z" />
      <path d="M18.3333 10V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.3333 10Z" />
    </svg>
  );
}

function CourthouseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.66675 18.3333H18.3334" />
      <path d="M10 1.66666C11.3333 2.19999 12.8333 2.19999 14.1667 1.66666V4.16666C12.8333 4.69999 11.3333 4.69999 10 4.16666V1.66666Z" />
      <path d="M10 4.16666V6.66666" />
      <path d="M14.1666 6.66666H5.83325C4.16659 6.66666 3.33325 7.49999 3.33325 9.16666V18.3333H16.6666V9.16666C16.6666 7.49999 15.8333 6.66666 14.1666 6.66666Z" />
      <path d="M3.81665 10H16.1833" />
      <path d="M6.65845 10V18.3333" />
      <path d="M9.9917 10V18.3333" />
      <path d="M13.325 10V18.3333" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.25 8.51666V15.8333C16.25 17.5 15.8333 18.3333 13.75 18.3333H6.25C4.16667 18.3333 3.75 17.5 3.75 15.8333V8.51666" />
      <path d="M4.16675 1.66666H15.8334C17.5001 1.66666 18.3334 2.49999 18.3334 4.16666V5.83332C18.3334 7.49999 17.5001 8.33332 15.8334 8.33332H4.16675C2.50008 8.33332 1.66675 7.49999 1.66675 5.83332V4.16666C1.66675 2.49999 2.50008 1.66666 4.16675 1.66666Z" />
      <path d="M8.4834 11.6667H11.5167" />
    </svg>
  );
}

function TeacherIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.37502 2.1083L3.35835 5.3833C1.75002 6.4333 1.75002 8.7833 3.35835 9.8333L8.37502 13.1083C9.27502 13.7 10.7583 13.7 11.6583 13.1083L16.65 9.8333C18.25 8.7833 18.25 6.44164 16.65 5.39164L11.6583 2.11664C10.7583 1.51664 9.27502 1.51664 8.37502 2.1083Z" />
      <path d="M4.69193 10.9L4.68359 14.8084C4.68359 15.8667 5.50026 17 6.50026 17.3334L9.15859 18.2167C9.61693 18.3667 10.3753 18.3667 10.8419 18.2167L13.5003 17.3334C14.5003 17 15.3169 15.8667 15.3169 14.8084V10.9417" />
      <path d="M17.8333 12.5V7.5" />
    </svg>
  );
}

function Category2Icon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.1667 8.33332H15.8334C17.5001 8.33332 18.3334 7.49999 18.3334 5.83332V4.16666C18.3334 2.49999 17.5001 1.66666 15.8334 1.66666H14.1667C12.5001 1.66666 11.6667 2.49999 11.6667 4.16666V5.83332C11.6667 7.49999 12.5001 8.33332 14.1667 8.33332Z" />
      <path d="M4.16675 18.3333H5.83341C7.50008 18.3333 8.33341 17.5 8.33341 15.8333V14.1667C8.33341 12.5 7.50008 11.6667 5.83341 11.6667H4.16675C2.50008 11.6667 1.66675 12.5 1.66675 14.1667V15.8333C1.66675 17.5 2.50008 18.3333 4.16675 18.3333Z" />
      <path d="M5.00008 8.33332C6.84103 8.33332 8.33341 6.84094 8.33341 4.99999C8.33341 3.15904 6.84103 1.66666 5.00008 1.66666C3.15913 1.66666 1.66675 3.15904 1.66675 4.99999C1.66675 6.84094 3.15913 8.33332 5.00008 8.33332Z" />
      <path d="M15.0001 18.3333C16.841 18.3333 18.3334 16.8409 18.3334 15C18.3334 13.159 16.841 11.6667 15.0001 11.6667C13.1591 11.6667 11.6667 13.159 11.6667 15C11.6667 16.8409 13.1591 18.3333 15.0001 18.3333Z" />
    </svg>
  );
}

function TrashVuesaxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.33 16.5H13.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const categoryIcon: Record<Category, React.ReactNode> = {
  Travel: <AirplaneIcon />,
  "Food & dining": <ReceiptTextIcon />,
  Transportation: <TruckIcon />,
  Accommodation: <CourthouseIcon />,
  Utilities: <GraphIcon />,
  Event: <TeacherIcon />,
  "Office supplies": <ArchiveIcon />,
  Software: <MonitorIcon />,
  Other: <Category2Icon />,
};

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function detectAttachmentKind(name: string): AttachmentKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (ext === "csv") return "csv";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "image";
  return "file";
}

function normalizeAmountValue(value: string): string {
  const noCommas = value.replace(/,/g, "");
  const cleaned = noCommas.replace(/[^0-9.]/g, "");
  const firstDot = cleaned.indexOf(".");
  const withSingleDot =
    firstDot === -1 ? cleaned : `${cleaned.slice(0, firstDot + 1)}${cleaned.slice(firstDot + 1).replace(/\./g, "")}`;

  if (!withSingleDot) return "";

  const [integerRaw, decimalRaw] = withSingleDot.split(".");
  const integerPart = integerRaw ? Number(integerRaw).toLocaleString("en-US") : "";

  if (decimalRaw !== undefined) {
    return `${integerPart || "0"}.${decimalRaw.slice(0, 2)}`;
  }

  return integerPart;
}

function parseAmountValue(value: string): number {
  const n = Number(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function NewExpenseFlow({
  open,
  onClose,
  onSaveDraft,
  onSubmitExpense,
  onSubmitSuccessAcknowledge,
  initialDraft,
}: NewExpenseFlowProps) {
  const [step, setStep] = useState<Step>("new");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dueOpen, setDueOpen] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const dueRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const reuploadInputRef = useRef<HTMLInputElement | null>(null);
  const reuploadIndexRef = useRef<number | null>(null);
  const lastDueDateSelectionTsRef = useRef(0);
  const dragCounterRef = useRef(0);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [submitSuccessOpen, setSubmitSuccessOpen] = useState(false);
  const [submitSuccessStage, setSubmitSuccessStage] = useState<"loading" | "success">("loading");
  const [draft, setDraft] = useState<ExpenseDraft>({
    amount: "",
    type: "Expense request",
    dueDate: "2026-04-20",
    category: "",
    items: [{ name: "", amount: "", quantity: "1" }],
    description: "",
    attachments: [],
  });
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(2026, 3, 1));
  const todayIso = useMemo(() => toISODate(new Date()), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setStep("new");
      setCategoryError(false);
      setSubmitSuccessOpen(false);
      return;
    }

    if (initialDraft) {
      setDraft({
        amount: initialDraft.amount,
        type: initialDraft.type,
        dueDate: initialDraft.dueDate,
        category: initialDraft.category,
        items: initialDraft.items?.length ? initialDraft.items : [{ name: "", amount: "", quantity: "1" }],
        description: initialDraft.description,
        attachments: initialDraft.attachments,
      });
    }
  }, [open, initialDraft]);

  useEffect(() => {
    if (!submitSuccessOpen) {
      setSubmitSuccessStage("loading");
      return;
    }

    const successTimer = window.setTimeout(() => {
      setSubmitSuccessStage("success");
    }, 900);

    return () => window.clearTimeout(successTimer);
  }, [submitSuccessOpen]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (categoryOpen && categoryRef.current && !categoryRef.current.contains(target)) setCategoryOpen(false);
      if (dueOpen && dueRef.current && !dueRef.current.contains(target)) setDueOpen(false);
    }

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [categoryOpen, dueOpen]);

  const totalAmountNumber = useMemo(
    () =>
      draft.items.reduce((sum, item) => {
        const amount = parseAmountValue(item.amount);
        const quantity = Math.max(1, Number(item.quantity) || 1);
        return sum + amount * quantity;
      }, 0),
    [draft.items],
  );

  const totalAmountValue = useMemo(
    () =>
      totalAmountNumber.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [totalAmountNumber],
  );

  const formattedAmount = useMemo(
    () => totalAmountNumber.toLocaleString(undefined, { style: "currency", currency: "USD" }),
    [totalAmountNumber],
  );

  const dueDateText = useMemo(() => {
    const d = new Date(`${draft.dueDate}T00:00:00`);
    if (Number.isNaN(d.getTime())) return "Select due date";
    const day = d.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
    const month = d.toLocaleDateString(undefined, { month: "long" });
    return `${day}${suffix}, ${month} ${d.getFullYear()}`;
  }, [draft.dueDate]);

  const calendarDays = useMemo(() => {
    const y = visibleMonth.getFullYear();
    const m = visibleMonth.getMonth();
    const first = new Date(y, m, 1);
    const start = first.getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const prevDays = new Date(y, m, 0).getDate();
    const cells: Array<{ day: number; monthOffset: -1 | 0 | 1; iso: string }> = [];
    for (let i = 0; i < start; i++) {
      const day = prevDays - start + i + 1;
      const d = new Date(y, m - 1, day);
      cells.push({ day, monthOffset: -1, iso: toISODate(d) });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(y, m, day);
      cells.push({ day, monthOffset: 0, iso: toISODate(d) });
    }
    while (cells.length < 42) {
      const day = cells.length - (start + daysInMonth) + 1;
      const d = new Date(y, m + 1, day);
      cells.push({ day, monthOffset: 1, iso: toISODate(d) });
    }
    return cells;
  }, [visibleMonth]);

  const suggestedCategories = useMemo(() => {
    const text = draft.description.toLowerCase();
    if (!text.trim()) return [] as Category[];

    const rules: Array<{ category: Category; keywords: string[] }> = [
      { category: "Food & dining", keywords: ["lunch", "dinner", "breakfast", "meal", "restaurant", "cafe", "food"] },
      { category: "Travel", keywords: ["flight", "trip", "travel", "airfare", "boarding", "airport"] },
      { category: "Transportation", keywords: ["uber", "taxi", "bus", "train", "transport", "ride", "fuel", "parking"] },
      { category: "Accommodation", keywords: ["hotel", "lodging", "stay", "airbnb", "accommodation"] },
      { category: "Software", keywords: ["license", "subscription", "saas", "figma", "slack", "software"] },
      { category: "Utilities", keywords: ["utility", "electric", "water", "internet", "repair", "maintenance"] },
      { category: "Event", keywords: ["event", "summit", "conference", "workshop", "meetup"] },
      { category: "Office supplies", keywords: ["stationery", "printer", "ink", "paper", "supplies"] },
    ];

    const matched = rules
      .filter((rule) => rule.keywords.some((k) => text.includes(k)))
      .map((rule) => rule.category);

    return [...new Set(matched)].slice(0, 4);
  }, [draft.description]);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const next = Array.from(fileList).map((file) => ({
      name: file.name,
      kind: detectAttachmentKind(file.name),
    }));
    setDraft((prev) => {
      const seen = new Set(prev.attachments.map((item) => item.name.toLowerCase()));
      const unique = next.filter((item) => !seen.has(item.name.toLowerCase()));
      return { ...prev, attachments: [...prev.attachments, ...unique] };
    });
  }

  function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    setIsDraggingFiles(true);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!isDraggingFiles) setIsDraggingFiles(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDraggingFiles(false);
    }
  }

  function onDropFiles(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDraggingFiles(false);
    handleFiles(e.dataTransfer.files);
  }

  function removeAttachment(index: number) {
    setDraft((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  }

  function beginReuploadAt(index: number) {
    reuploadIndexRef.current = index;
    reuploadInputRef.current?.click();
  }

  function handleReuploadFile(fileList: FileList | null) {
    const index = reuploadIndexRef.current;
    reuploadIndexRef.current = null;
    if (index === null || !fileList?.length) return;
    const file = fileList[0];
    const item = { name: file.name, kind: detectAttachmentKind(file.name) };
    setDraft((prev) => ({
      ...prev,
      attachments: prev.attachments.map((att, i) => (i === index ? item : att)),
    }));
  }

  function addItemRow() {
    setDraft((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", amount: "", quantity: "1" }],
    }));
  }

  function updateItemRow(index: number, key: keyof DraftItem, value: string) {
    setDraft((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  }

  function removeItemRow(index: number) {
    setDraft((prev) => ({
      ...prev,
      items: prev.items.length <= 1 ? prev.items : prev.items.filter((_, i) => i !== index),
    }));
  }

  function saveDraftAndClose() {
    onSaveDraft?.({
      id: initialDraft?.id ?? `draft-${Date.now()}`,
      amount: totalAmountValue,
      type: draft.type,
      dueDate: draft.dueDate,
      category: draft.category,
      items: draft.items,
      description: draft.description,
      attachments: draft.attachments,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  }

  function goToReview() {
    if (!draft.category) {
      setCategoryError(true);
      return;
    }
    setCategoryError(false);
    setStep("review");
  }

  function submitExpenseAndClose() {
    onSubmitExpense?.({
      id: initialDraft?.id ?? `expense-${Date.now()}`,
      amount: totalAmountValue,
      type: draft.type,
      dueDate: draft.dueDate,
      category: draft.category,
      items: draft.items,
      description: draft.description,
      attachments: draft.attachments,
      updatedAt: new Date().toISOString(),
    });
    setSubmitSuccessOpen(true);
  }

  function backToOverviewAfterSuccess() {
    setSubmitSuccessOpen(false);
    onSubmitSuccessAcknowledge?.();
    onClose();
  }

  if (!open) return null;

  return createPortal(
    <>
    <div className="fixed inset-0 z-[300] bg-[#F9FBFC] flex flex-col">
      <div className="h-20 shrink-0 border-b border-[#EEEFF2] bg-white px-6 sm:px-10 lg:px-20 flex items-center justify-between">
        <img src="/logo.svg" alt="Stratus" className="h-8 w-auto" />
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#EEEFF2] text-[#808897] hover:bg-[#e5e7ed] transition-colors flex items-center justify-center"
          aria-label="Close flow"
        >
          <img src="/x-close.svg" alt="" width="16" height="16" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="w-[400px] mx-auto pt-14 pb-28">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={step === "new" ? onClose : () => setStep("new")}
              className="h-[34px] px-3 rounded-[12px] border border-[#EEEFF2] bg-white text-[#272835] text-xs font-medium inline-flex items-center gap-2"
            >
              <img src="/arrow-left.svg" alt="" width="16" height="16" />
              Back
            </button>
            <div className="h-[26px] w-[50px] rounded-full bg-[#EFF0FC] border border-[#E8E8FC] px-[12px] flex items-center justify-center gap-2">
              <span
                className={`w-[10px] h-2.5 rounded-full transition-colors ${
                  step === "new" ? "bg-[#6573F9]" : "bg-[#FFFFFF]"
                }`}
              />
              <span
                className={`w-[10px] h-2.5 rounded-full transition-colors ${
                  step === "review" ? "bg-[#6573F9]" : "bg-[#FFFFFF]"
                }`}
              />
            </div>
          </div>

          {step === "new" ? (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-[20px] leading-[1.35] font-semibold text-[#272835]">Create new expense</h2>
                <p className="text-sm text-[#6C7386] tracking-[0.28px] mt-1">Create a new expense or reimbursement to be approved</p>
              </div>

              <label className="mb-0 block space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[#6C7386] tracking-[0.28px]">Items</span>
                  <div className="inline-flex items-center justify-center rounded-full border-0 border-none border-transparent [border-image:none] p-0 bg-transparent">
                    <span className="text-sm font-semibold leading-3 align-middle text-[#272835]">${totalAmountValue}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {draft.items.map((item, idx) => (
                    <div key={`item-${idx}`} className="rounded-[12px] border border-[#DFE1E6] bg-white p-4 space-y-2">
                      <input
                        value={item.name}
                        onChange={(e) => updateItemRow(idx, "name", e.target.value)}
                        className="w-full h-10 rounded-[10px] border border-[#DFE1E6] px-3 text-sm text-[#272835] outline-none focus-visible:border-[#6573F9] focus-visible:ring-2 focus-visible:ring-[#6573F9]/20"
                        placeholder="Item name"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="w-full h-10 rounded-[10px] border border-[#DFE1E6] px-3 bg-white flex items-center gap-1 text-sm transition-[border-color,box-shadow] focus-within:border-[#6573F9] focus-within:ring-2 focus-within:ring-[#6573F9]/20">
                          <span className="text-[#272835]">$</span>
                          <input
                            value={item.amount}
                            onChange={(e) => updateItemRow(idx, "amount", normalizeAmountValue(e.target.value))}
                            className="flex-1 bg-transparent text-sm text-[#272835] outline-none"
                            placeholder="0.00"
                          />
                        </div>
                        <div className="w-full h-10 rounded-[10px] border border-[#DFE1E6] px-2 bg-white flex items-center justify-between text-sm text-[#272835]">
                          <button
                            type="button"
                            onClick={() => {
                              const current = Math.max(1, Number(item.quantity) || 1);
                              updateItemRow(idx, "quantity", String(Math.max(1, current - 1)));
                            }}
                            className="w-6 h-6 rounded-md text-[#808897] hover:bg-[#F4F5F8] hover:text-[#272835] inline-flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="min-w-[20px] text-center font-medium">{Math.max(1, Number(item.quantity) || 1)}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const current = Math.max(1, Number(item.quantity) || 1);
                              updateItemRow(idx, "quantity", String(Math.min(999, current + 1)));
                            }}
                            className="w-6 h-6 rounded-md text-[#808897] hover:bg-[#F4F5F8] hover:text-[#272835] inline-flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {draft.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItemRow(idx)}
                          className="inline-flex items-center gap-1 text-xs text-[#DF1C41] hover:opacity-80"
                        >
                          Remove item
                          <TrashVuesaxIcon />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addItemRow}
                  className="inline-flex w-fit h-fit items-center px-0 rounded-[10px] border-none text-sm text-[#6573F9] bg-transparent hover:bg-transparent"
                >
                  + Add another item
                </button>
              </label>

              <div className="flex flex-col gap-4">
                <Field label="Type">
                  <div className="relative">
                    <select
                      value={draft.type}
                      onChange={(e) => setDraft((prev) => ({ ...prev, type: e.target.value }))}
                      className="w-full h-12 rounded-[12px] border border-[#DFE1E6] bg-white pl-4 pr-10 text-sm text-[#272835] outline-none appearance-none transition-[border-color,box-shadow] focus-visible:border-[#6573F9] focus-visible:ring-2 focus-visible:ring-[#6573F9]/20"
                    >
                      <option>Expense request</option>
                      <option>Reimbursement</option>
                    </select>
                    <img src="/chevron-down.svg" alt="" width="20" height="20" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </Field>
                <Field label="Due date">
                  <div className="relative" ref={dueRef}>
                    <button
                      type="button"
                      onClick={() => {
                        if (Date.now() - lastDueDateSelectionTsRef.current < 250) return;
                        setDueOpen((prev) => !prev);
                      }}
                      className="w-full h-12 rounded-[12px] border border-[#DFE1E6] bg-white pl-4 pr-10 text-sm text-left text-[#272835] outline-none transition-[border-color,box-shadow] focus-visible:border-[#6573F9] focus-visible:ring-2 focus-visible:ring-[#6573F9]/20"
                    >
                      {draft.dueDate ? dueDateText : "Select due date"}
                    </button>
                    <img src="/calendar.svg" alt="" width="20" height="20" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    {dueOpen && (
                      <div
                        className="absolute z-20 mt-2 w-[280px] rounded-xl border border-[#DFE1E6] bg-white p-3 shadow-[0_10px_20px_rgba(13,13,18,0.08)]"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <button type="button" className="w-7 h-7 rounded-md hover:bg-[#F4F5F8] inline-flex items-center justify-center" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}>
                            <img src="/calendar-prev.svg" alt="Previous month" width="18" height="18" />
                          </button>
                          <p className="text-sm font-medium text-[#272835]">
                            {visibleMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                          </p>
                          <button type="button" className="w-7 h-7 rounded-md hover:bg-[#F4F5F8] inline-flex items-center justify-center" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}>
                            <img src="/calendar-next.svg" alt="Next month" width="18" height="18" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-[11px] text-[#808897] mb-1">
                          {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
                            <div key={`${d}-${idx}`} className="h-7 flex items-center justify-center">{d}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {calendarDays.map((cell) => {
                            const isSelected = draft.dueDate === cell.iso;
                            const isMuted = cell.monthOffset !== 0;
                            const isPast = cell.iso < todayIso;
                            return (
                              <button
                                key={`${cell.iso}-${cell.day}`}
                                type="button"
                                disabled={isPast}
                                onClick={() => {
                                  if (isPast) return;
                                  lastDueDateSelectionTsRef.current = Date.now();
                                  setDueOpen(false);
                                  setDraft((prev) => ({ ...prev, dueDate: cell.iso }));
                                  setVisibleMonth(new Date(cell.iso));
                                }}
                                className={`h-8 rounded-md text-xs ${isSelected ? "bg-[#5E56FF] text-white hover:bg-[#5E56FF]" : "text-[#272835]"} ${isMuted ? "opacity-40" : ""} ${isPast ? "opacity-30 cursor-not-allowed" : isSelected ? "" : "hover:bg-[#F4F5F8]"}`}
                              >
                                {cell.day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Field>
              </div>

              <Field label="Enter description">
                <textarea
                  value={draft.description}
                  onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full min-h-[120px] rounded-[12px] border border-[#DFE1E6] bg-white px-4 pt-4 pb-0 text-sm text-[#272835] leading-5 outline-none resize-none transition-[border-color,box-shadow] focus-visible:border-[#6573F9] focus-visible:ring-2 focus-visible:ring-[#6573F9]/20"
                  placeholder="Add an internal note"
                />
              </Field>

              <Field label="Category">
                <div className="relative" ref={categoryRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryOpen((prev) => !prev)}
                    className={`w-full h-12 rounded-[12px] bg-white pl-4 pr-10 text-sm text-[#272835] inline-flex items-center justify-between transition-[border-color,box-shadow] focus-visible:border-[#6573F9] focus-visible:ring-2 focus-visible:ring-[#6573F9]/20 ${
                      categoryError ? "border border-[#DF1C41]" : "border border-[#DFE1E6]"
                    }`}
                  >
                    {draft.category ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="text-[rgba(85,85,94,1)]">{categoryIcon[draft.category as Category]}</span>
                        <span>{draft.category}</span>
                      </span>
                    ) : (
                      <span className="text-[#808897]">Select category</span>
                    )}
                  </button>
                  <img src="/chevron-down.svg" alt="" width="20" height="20" className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
                  <div className={`absolute z-20 mt-2 w-full rounded-[12px] border border-[#DFE1E6] bg-white shadow-[0_10px_20px_rgba(13,13,18,0.08)] overflow-hidden ${categoryOpen ? "block" : "hidden"}`}>
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setDraft((prev) => ({ ...prev, category }));
                          setCategoryError(false);
                          setCategoryOpen(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-[#272835] hover:bg-[#F8F8F9] inline-flex items-center gap-2"
                      >
                        <span className="text-[rgba(85,85,94,1)]">{categoryIcon[category]}</span>
                        <span>{category}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {suggestedCategories.length > 0 && !draft.category && (
                  <div className="flex flex-wrap gap-2">
                    {suggestedCategories.map((suggested) => (
                      <button
                        key={suggested}
                        type="button"
                        onClick={() => {
                          setDraft((prev) => ({ ...prev, category: suggested }));
                          setCategoryError(false);
                          setCategoryOpen(false);
                        }}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs border ${
                          draft.category === suggested
                            ? "bg-[#F0F2FF] border-[#C9CEFF] text-[#3E50F7]"
                            : "bg-[#EEF0FC] border-[#DFE1E6] text-[#272835]"
                        }`}
                      >
                        <span className="leading-[1.4] align-middle text-[rgba(103,95,255,1)]">
                          {categoryIcon[suggested]}
                        </span>
                        <span className="leading-[1.2] align-middle text-left text-[rgba(94,86,255,1)] font-medium">
                          {suggested}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {categoryError && (
                  <p className="text-xs text-[#DF1C41]">Please select a category to continue.</p>
                )}
              </Field>

              <Field label="Attachments">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.csv,.gif,.webp,.svg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.mp3,.mp4,.mov,.wav,.html,.htm"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <input
                  ref={reuploadInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.csv,.gif,.webp,.svg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.mp3,.mp4,.mov,.wav,.html,.htm"
                  className="hidden"
                  onChange={(e) => {
                    handleReuploadFile(e.target.files);
                    e.target.value = "";
                  }}
                />
                {draft.attachments.length === 0 ? (
                  <div
                    className={`rounded-[12px] border border-dashed bg-white px-3 py-[14px] transition-colors ${
                      isDraggingFiles ? "border-[#6573F9] bg-[#F6F7FF]" : "border-[#DFE1E6]"
                    }`}
                    onDragEnter={onDragEnter}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDropFiles}
                  >
                    <div className="flex items-start gap-5">
                      <img src="/file-attachment-02.svg" alt="" width="24" height="24" className="shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-[#272835]">
                          Drag and drop here or{" "}
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[#5E56FF] underline">
                            click
                          </button>{" "}
                          to upload
                        </p>
                        <p className="text-xs text-[#6C7386] tracking-[0.24px] mt-1">
                        Documents, images, spreadsheets, archives, audio, and video files
                      </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {draft.attachments.map((file, idx) => (
                      <div key={`${file.name}-${idx}`} className="h-[44px] rounded-[12px] border border-[#DFE1E6] bg-white px-3 py-7 flex items-center gap-2">
                        <img
                          src={getAttachmentIconSrc(file.name)}
                          alt=""
                          width={24}
                          height={24}
                          className="shrink-0 object-contain"
                        />
                        <span
                          className="min-w-0 flex-1 truncate text-sm text-[#272835]"
                          title={file.name}
                        >
                          {file.name}
                        </span>
                        <div className="ml-auto flex shrink-0 items-center gap-3">
                          <button
                            type="button"
                            onClick={() => beginReuploadAt(idx)}
                            className="inline-flex items-center justify-center rounded-lg border border-[#E0E1E6] p-2 text-[#5E56FF] hover:bg-[#F6F7FF]"
                            aria-label={`Replace ${file.name}`}
                          >
                            <img src="/rotate-left.svg" alt="" width={14} height={14} className="shrink-0" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#E0E1E6] p-2 text-[#DF1C41] hover:bg-[#FEF2F3] hover:opacity-90"
                            aria-label={`Remove ${file.name}`}
                          >
                            <TrashVuesaxIcon />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center h-9 px-3 rounded-[10px] border border-[#DFE1E6] text-sm text-[#272835] bg-white hover:bg-[#F8F8F9]"
                    >
                      + Add another file
                    </button>
                  </div>
                )}
              </Field>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-[20px] leading-[1.35] font-semibold text-[#272835]">Review expense</h2>
                <p className="text-sm font-medium text-[#6C7386] tracking-[0.28px] mt-1">Double-check the details before submitting</p>
              </div>

              <div className="rounded-[20px] border border-[#DFE1E6] bg-white p-5 space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#6C7386] tracking-[0.28px]">Amount requested</p>
                  <p className="text-[40px] leading-[1.25] font-medium text-[#272835]">{formattedAmount}</p>
                </div>
                <div className="h-px bg-[#DFE1E6]" />
                <div className="space-y-5 text-sm tracking-[0.28px]">
                  <Row
                    label="Category"
                    value={
                      draft.category ? (
                        <span className="inline-flex items-center gap-1.5 rounded-[5px] bg-[#F5F5F7] px-2 py-1 text-xs text-[#272835]">
                          <span className="text-[rgba(85,85,94,1)]">{categoryIcon[draft.category as Category]}</span>
                          {draft.category}
                        </span>
                      ) : (
                        <span className="text-[#808897] font-medium">Not selected</span>
                      )
                    }
                  />
                  <Row label="Type" value={<span className="text-[#272835] font-medium">{draft.type}</span>} />
                  <Row label="Due date" value={<span className="text-[#272835] font-medium">{dueDateText}</span>} />
                  <Row label="Description" value={<span className="text-[#272835] font-medium text-right max-w-[180px]">{draft.description}</span>} />
                </div>
                <div className="h-px bg-[#DFE1E6]" />
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#6C7386] tracking-[0.28px]">Items</p>
                  <div className="space-y-2">
                    {draft.items
                      .filter((item) => item.name || item.amount)
                      .map((item, idx) => (
                        <div key={`review-item-${idx}`} className="flex items-center justify-between text-sm">
                          <span className="text-[#272835]">{item.name || `Item ${idx + 1}`}</span>
                          <span className="text-[#272835] font-medium">
                            {(item.amount ? `$${item.amount}` : "$0.00")} x {item.quantity || "1"}
                          </span>
                        </div>
                      ))}
                    {draft.items.every((item) => !item.name && !item.amount) && (
                      <p className="text-sm text-[#808897]">No items added</p>
                    )}
                  </div>
                </div>
                <div className="h-px bg-[#DFE1E6]" />
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#6C7386] tracking-[0.28px]">Attachments</p>
                  <div className="flex gap-3">
                    {draft.attachments.map((file, idx) => (
                      <span
                        key={`${file.name}-${idx}`}
                        className="inline-flex items-center gap-2 rounded-[40px] bg-[#F8F8F9] px-[10px] py-[10px] text-xs font-medium text-[#272835] max-w-full"
                      >
                        <img
                          src={getAttachmentIconSrc(file.name)}
                          alt=""
                          width={20}
                          height={20}
                          className="shrink-0 object-contain"
                        />
                        <span className="truncate">{file.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[88px] shrink-0 border-t border-[#EEEFF2] bg-white flex items-center justify-center px-8">
        <div className="w-[400px] flex gap-4">
          {step === "new" ? (
            <>
              <button
                type="button"
                onClick={saveDraftAndClose}
                className="flex-1 h-10 rounded-[12px] border border-[#DFE1E6] text-[#5E56FF] text-sm font-semibold bg-white"
              >
                Save as draft
              </button>
              <button
                type="button"
                onClick={goToReview}
                className="flex-1 h-10 rounded-[12px] border border-[#6573F9] text-white text-sm font-semibold"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(90deg, #5E56FF 0%, #5E56FF 100%)",
                  boxShadow: "1px 2px 4px rgba(13,13,18,0.12)",
                }}
              >
                Proceed
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={submitExpenseAndClose}
              className="w-full h-10 rounded-[12px] border border-[#6573F9] text-white text-sm font-semibold"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(90deg, #5E56FF 0%, #5E56FF 100%)",
                boxShadow: "1px 2px 4px rgba(13,13,18,0.12)",
              }}
            >
              Submit expense
            </button>
          )}
        </div>
      </div>
    </div>

    <Dialog
      open={submitSuccessOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) backToOverviewAfterSuccess();
      }}
    >
      <DialogContent className="inset-0 left-0 top-0 flex h-[100dvh] max-h-[100dvh] w-full max-w-none translate-x-0 translate-y-0 flex-col items-center justify-center rounded-none border-0 bg-white p-8 shadow-none sm:max-w-none gap-6 overflow-y-auto">
        <DialogHeader className="w-[380px] items-center text-center sm:text-center space-y-0">
          <div className={`expense-success-slot ${submitSuccessStage === "loading" ? "is-loading" : "is-success"}`} aria-hidden="true">
            <div className="expense-success-morph-overlay">
              <div className="expense-success-loader" />
              <svg className="expense-success-check" viewBox="0 0 44 44">
                <path d="M 10 22 L 19 31 L 34 14" />
              </svg>
              <div className="expense-success-pulse" />
            </div>
          </div>
          <DialogTitle className="mt-5 text-[22px] leading-[1.3] font-semibold text-[#272835]">
            {submitSuccessStage === "loading" ? "Logging expense..." : "Expense logged successfully"}
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-[#6C7386]">
            {submitSuccessStage === "loading"
              ? "We're submitting your expense request now."
              : "Your expense request has been submitted and is now pending approval."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full max-w-[400px] flex-col gap-0 sm:flex-col mx-auto sm:justify-center">
          <Button type="button" className="w-full" onClick={backToOverviewAfterSuccess}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>,
    document.body,
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-0 block space-y-2">
      <span className="text-sm font-medium text-[#6C7386] tracking-[0.28px]">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-5">
      <p className="text-[#6C7386] font-medium w-[180px]">{label}</p>
      <div className="text-right">{value}</div>
    </div>
  );
}
