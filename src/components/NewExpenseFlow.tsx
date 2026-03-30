import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface NewExpenseFlowProps {
  open: boolean;
  onClose: () => void;
  onSaveDraft?: (draft: ExpenseDraftData) => void;
  initialDraft?: ExpenseDraftData | null;
}

type Step = "new" | "review";

interface ExpenseDraft {
  amount: string;
  type: string;
  dueDate: string;
  category: string;
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
  description: string;
  attachments: DraftAttachment[];
  updatedAt: string;
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
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4.75L2.63765 2.23781C2.42852 2.01223 2.46201 1.84746 2.70864 1.70481C3.17227 1.43663 3.53344 1.42935 4.02214 1.69754L6.4745 3.04336C6.6491 3.13916 6.8203 3.23628 7 3.28926" />
      <path d="M6.25 6.8316L7.30515 10.2348C7.3913 10.5127 7.543 10.5632 7.778 10.4284C8.2198 10.1751 8.3979 9.8825 8.40985 9.35535L8.46975 6.7099C8.47775 6.35655 8.4763 6.01075 8.75 5.75" />
      <path d="M4.16423 5.49214L5.1077 4.80277L7.3218 3.18852C7.3218 3.18852 8.13925 2.58795 8.59595 2.38789C9.13825 2.15032 9.64345 2.26077 10.187 2.41256C10.4681 2.49108 10.6087 2.53033 10.7101 2.60357C10.871 2.71978 10.9757 2.89863 10.9972 3.09425C11.0108 3.21754 10.9749 3.35728 10.9033 3.63677C10.7647 4.17713 10.6091 4.66408 10.1294 5.00874C9.72545 5.29899 8.78965 5.69729 8.78965 5.69729L6.26585 6.78224L5.1891 7.24379C4.7987 7.41114 4.6035 7.49479 4.4707 7.65009C4.15967 8.01374 4.11574 8.67188 3.99966 9.12468C3.93551 9.37488 3.58374 9.80854 3.27029 9.74344C3.07678 9.70324 3.07307 9.46099 3.04898 9.30654L2.8171 7.81944C2.76165 7.46379 2.7574 7.45654 2.473 7.23134L1.28379 6.28964C1.16027 6.19179 0.949516 6.06749 1.011 5.88204C1.1106 5.58164 1.66704 5.49784 1.91874 5.56814C2.37417 5.69534 2.97374 5.98689 3.44842 5.90289C3.6511 5.86704 3.82215 5.74209 4.16423 5.49214Z" />
    </svg>
  );
}

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
      <path d="M6.84515 9.72835C6.75 9.49865 6.75 9.20745 6.75 8.625C6.75 8.04255 6.75 7.75135 6.84515 7.52165C6.972 7.21535 7.21535 6.972 7.52165 6.84515C7.75135 6.75 8.04255 6.75 8.625 6.75C9.20745 6.75 9.49865 6.75 9.72835 6.84515C10.0346 6.972 10.278 7.21535 10.4049 7.52165C10.5 7.75135 10.5 8.04255 10.5 8.625C10.5 9.20745 10.5 9.49865 10.4049 9.72835C10.278 10.0346 10.0346 10.278 9.72835 10.4049C9.49865 10.5 9.20745 10.5 8.625 10.5C8.04255 10.5 7.75135 10.5 7.52165 10.4049C7.21535 10.278 6.972 10.0346 6.84515 9.72835Z" />
      <path d="M6.84515 4.47835C6.75 4.24864 6.75 3.95742 6.75 3.375C6.75 2.79258 6.75 2.50136 6.84515 2.27165C6.972 1.96536 7.21535 1.72202 7.52165 1.59515C7.75135 1.5 8.04255 1.5 8.625 1.5C9.20745 1.5 9.49865 1.5 9.72835 1.59515C10.0346 1.72202 10.278 1.96536 10.4049 2.27165C10.5 2.50136 10.5 2.79258 10.5 3.375C10.5 3.95742 10.5 4.24864 10.4049 4.47835C10.278 4.78464 10.0346 5.028 9.72835 5.15485C9.49865 5.25 9.20745 5.25 8.625 5.25C8.04255 5.25 7.75135 5.25 7.52165 5.15485C7.21535 5.028 6.972 4.78464 6.84515 4.47835Z" />
      <path d="M1.59515 9.72835C1.5 9.49865 1.5 9.20745 1.5 8.625C1.5 8.04255 1.5 7.75135 1.59515 7.52165C1.72202 7.21535 1.96536 6.972 2.27165 6.84515C2.50136 6.75 2.79258 6.75 3.375 6.75C3.95742 6.75 4.24864 6.75 4.47835 6.84515C4.78464 6.972 5.028 7.21535 5.15485 7.52165C5.25 7.75135 5.25 8.04255 5.25 8.625C5.25 9.20745 5.25 9.49865 5.15485 9.72835C5.028 10.0346 4.78464 10.278 4.47835 10.4049C4.24864 10.5 3.95742 10.5 3.375 10.5C2.79258 10.5 2.50136 10.5 2.27165 10.4049C1.96536 10.278 1.72202 10.0346 1.59515 9.72835Z" />
      <path d="M1.59515 4.47835C1.5 4.24864 1.5 3.95742 1.5 3.375C1.5 2.79258 1.5 2.50136 1.59515 2.27165C1.72202 1.96536 1.96536 1.72202 2.27165 1.59515C2.50136 1.5 2.79258 1.5 3.375 1.5C3.95742 1.5 4.24864 1.5 4.47835 1.59515C4.78464 1.72202 5.028 1.96536 5.15485 2.27165C5.25 2.50136 5.25 2.79258 5.25 3.375C5.25 3.95742 5.25 4.24864 5.15485 4.47835C5.028 4.78464 4.78464 5.028 4.47835 5.15485C4.24864 5.25 3.95742 5.25 3.375 5.25C2.79258 5.25 2.50136 5.25 2.27165 5.15485C1.96536 5.028 1.72202 4.78464 1.59515 4.47835Z" />
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

const categoryIcon: Record<Category, React.ReactNode> = {
  Travel: <AirplaneIcon />,
  "Food & dining": <DashboardSquareIcon />,
  Transportation: <AirplaneIcon />,
  Accommodation: <LaptopIcon />,
  Utilities: <InvoiceIcon />,
  Event: <DashboardSquareIcon />,
  "Office supplies": <InvoiceIcon />,
  Software: <LaptopIcon />,
  Other: <DashboardSquareIcon />,
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

function attachmentBadge(kind: AttachmentKind): string {
  if (kind === "pdf") return "PDF";
  if (kind === "csv") return "CSV";
  if (kind === "image") return "IMG";
  return "FILE";
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

export function NewExpenseFlow({ open, onClose, onSaveDraft, initialDraft }: NewExpenseFlowProps) {
  const [step, setStep] = useState<Step>("new");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dueOpen, setDueOpen] = useState(false);
  const [categoryOverridden, setCategoryOverridden] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const dueRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dragCounterRef = useRef(0);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [draft, setDraft] = useState<ExpenseDraft>({
    amount: "",
    type: "Expense request",
    dueDate: "2026-04-20",
    category: "",
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
      setCategoryOverridden(false);
      setCategoryError(false);
      return;
    }

    if (initialDraft) {
      setDraft({
        amount: initialDraft.amount,
        type: initialDraft.type,
        dueDate: initialDraft.dueDate,
        category: initialDraft.category,
        description: initialDraft.description,
        attachments: initialDraft.attachments,
      });
      setCategoryOverridden(true);
    }
  }, [open, initialDraft]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (categoryOpen && categoryRef.current && !categoryRef.current.contains(target)) setCategoryOpen(false);
      if (dueOpen && dueRef.current && !dueRef.current.contains(target)) setDueOpen(false);
    }

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [categoryOpen, dueOpen]);

  const formattedAmount = useMemo(() => {
    const n = Number(draft.amount.replace(/,/g, ""));
    const safe = Number.isFinite(n) ? n : 0;
    return safe.toLocaleString(undefined, { style: "currency", currency: "USD" });
  }, [draft.amount]);

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

  function saveDraftAndClose() {
    onSaveDraft?.({
      id: initialDraft?.id ?? `draft-${Date.now()}`,
      amount: draft.amount,
      type: draft.type,
      dueDate: draft.dueDate,
      category: draft.category,
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

  if (!open) return null;

  return createPortal(
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
          <div className="flex items-center justify-between mb-[15px]">
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
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  step === "new" ? "bg-[#6573F9]" : "bg-[#FFFFFF]"
                }`}
              />
              <span
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  step === "review" ? "bg-[#6573F9]" : "bg-[#FFFFFF]"
                }`}
              />
            </div>
          </div>

          {step === "new" ? (
            <div className="space-y-[15px]">
              <div>
                <h2 className="text-[20px] leading-[1.35] font-semibold text-[#272835]">Create new expense</h2>
                <p className="text-sm text-[#6C7386] tracking-[0.28px] mt-1">Create a new expense or reimbursement to be approved</p>
              </div>

              <Field label="Amount">
                <div className="h-12 rounded-[12px] border border-[#DFE1E6] bg-white px-4 flex items-center gap-1 text-sm transition-[border-color,box-shadow] focus-within:border-[#6573F9] focus-within:ring-2 focus-within:ring-[#6573F9]/20">
                  <span className="text-[#272835]">$</span>
                  <input
                    value={draft.amount}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        amount: normalizeAmountValue(e.target.value),
                      }))
                    }
                    className="flex-1 bg-transparent outline-none text-[#272835]"
                    placeholder="0.00"
                  />
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-[15px]">
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
                      onClick={() => setDueOpen((prev) => !prev)}
                      className="w-full h-12 rounded-[12px] border border-[#DFE1E6] bg-white pl-4 pr-10 text-sm text-left text-[#272835] outline-none transition-[border-color,box-shadow] focus-visible:border-[#6573F9] focus-visible:ring-2 focus-visible:ring-[#6573F9]/20"
                    >
                      {draft.dueDate ? dueDateText : "Select due date"}
                    </button>
                    <img src="/calendar.svg" alt="" width="20" height="20" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    {dueOpen && (
                      <div className="absolute z-20 mt-2 w-[280px] rounded-xl border border-[#DFE1E6] bg-white p-3 shadow-[0_10px_20px_rgba(13,13,18,0.08)]">
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
                          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                            <div key={d} className="h-7 flex items-center justify-center">{d}</div>
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
                                  setDraft((prev) => ({ ...prev, dueDate: cell.iso }));
                                  setVisibleMonth(new Date(cell.iso));
                                  setDueOpen(false);
                                }}
                                className={`h-8 rounded-md text-xs ${isSelected ? "bg-[#5E56FF] text-white" : "text-[#272835]"} ${isMuted ? "opacity-40" : ""} ${isPast ? "opacity-30 cursor-not-allowed" : "hover:bg-[#F4F5F8]"}`}
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
                        <span className="text-[#272835]">{categoryIcon[draft.category as Category]}</span>
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
                          setCategoryOverridden(true);
                          setCategoryError(false);
                          setCategoryOpen(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-[#272835] hover:bg-[#F8F8F9] inline-flex items-center gap-2"
                      >
                        <span>{categoryIcon[category]}</span>
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
                          setCategoryOverridden(true);
                          setCategoryError(false);
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border ${
                          draft.category === suggested
                            ? "bg-[#F0F2FF] border-[#C9CEFF] text-[#3E50F7]"
                            : "bg-white border-[#DFE1E6] text-[#6C7386]"
                        }`}
                      >
                        <span>{categoryIcon[suggested]}</span>
                        <span>{suggested}</span>
                      </button>
                    ))}
                  </div>
                )}
                {categoryError && (
                  <p className="text-xs text-[#DF1C41]">Please select a category to continue.</p>
                )}
              </Field>

              <Field label="Attachments">
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
                      <p className="text-xs text-[#6C7386] tracking-[0.24px] mt-1">You may upload PDF, PNG, or JPEG files</p>
                    </div>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.csv,.gif,.webp,.svg"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                {draft.attachments.length > 0 && (
                  <div className="space-y-2">
                    {draft.attachments.map((file, idx) => (
                      <div key={`${file.name}-${idx}`} className="h-[44px] rounded-[12px] border border-[#DFE1E6] bg-white px-3 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-5 min-w-[28px] rounded bg-[#EEF0F8] text-[10px] font-semibold text-[#5E56FF] px-1">
                          {attachmentBadge(file.kind)}
                        </span>
                        <span className="text-sm text-[#272835] truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(idx)}
                          className="ml-auto text-xs text-[#808897] hover:text-[#272835]"
                          aria-label={`Remove ${file.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Field>
            </div>
          ) : (
            <div className="space-y-[15px]">
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
                          {categoryIcon[draft.category as Category]}
                          {draft.category}
                        </span>
                      ) : (
                        <span className="text-[#808897] font-medium">Not selected</span>
                      )
                    }
                  />
                  <Row label="Type" value={<span className="text-[#272835] font-medium">{draft.type}</span>} />
                  <Row label="Due date" value={<span className="text-[#272835] font-medium">{dueDateText}</span>} />
                  <Row label="Description" value={<span className="text-[#272835] font-medium text-left max-w-[180px]">{draft.description}</span>} />
                </div>
                <div className="h-px bg-[#DFE1E6]" />
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#6C7386] tracking-[0.28px]">Attachments</p>
                  <div className="flex gap-3">
                    {draft.attachments.map((file, idx) => (
                      <span key={`${file.name}-${idx}`} className="inline-flex items-center gap-1.5 rounded-[40px] bg-[#F8F8F9] px-[10px] py-[10px] text-xs font-medium text-[#272835]">
                        <span className="inline-flex items-center justify-center h-4 min-w-[22px] rounded bg-[#EEF0F8] text-[9px] font-semibold text-[#5E56FF] px-1">
                          {attachmentBadge(file.kind)}
                        </span>
                        {file.name}
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
              onClick={onClose}
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
    </div>,
    document.body,
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#6C7386] tracking-[0.28px]">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-5">
      <p className="text-[#6C7386] font-medium w-[180px]">{label}</p>
      <div>{value}</div>
    </div>
  );
}
