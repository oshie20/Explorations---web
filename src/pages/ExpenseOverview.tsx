
function Add01Icon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M10.0009 4.16669V15.835" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.835 10.0017H4.16663" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotsVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="10" cy="5" r="1.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="15" r="1.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FilterLinesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { StatCard, StatCardIcons } from "@/components/StatCard";
import { RequestCard } from "@/components/RequestCard";
import { PendingTable, type DateFilter, type TableRow } from "@/components/PendingTable";
import { CURRENT_USER_EMAIL } from "@/lib/currentUser";
import { DEMO_DRAFTS, DEMO_SUBMITTED_ROWS } from "@/lib/expenseDemoSeed";
import { NewExpenseFlow } from "../components/NewExpenseFlow";
import type { ExpenseDraftData } from "../components/NewExpenseFlow";

/**
 * Loads drafts + submitted rows from localStorage.
 * If both lists are empty (missing keys or `[]`), show demo data — otherwise earlier
 * versions only seeded when keys were absent, so `[]` in storage hid the demo forever.
 */
function loadExpenseStateFromStorage(): { drafts: ExpenseDraftData[]; submitted: TableRow[] } {
  try {
    const rawD = window.localStorage.getItem("expense-drafts");
    const rawS = window.localStorage.getItem("submitted-expenses");
    const draftsParsed = rawD != null ? (JSON.parse(rawD) as unknown) : null;
    const submittedParsed = rawS != null ? (JSON.parse(rawS) as unknown) : null;
    const draftsArr = Array.isArray(draftsParsed) ? (draftsParsed as ExpenseDraftData[]) : null;
    const submittedArr = Array.isArray(submittedParsed) ? (submittedParsed as TableRow[]) : null;
    const draftsEmpty = !draftsArr || draftsArr.length === 0;
    const submittedEmpty = !submittedArr || submittedArr.length === 0;

    if (draftsEmpty && submittedEmpty) {
      return { drafts: DEMO_DRAFTS, submitted: DEMO_SUBMITTED_ROWS };
    }
    return {
      drafts: draftsArr ?? [],
      submitted: submittedArr ?? [],
    };
  } catch {
    return { drafts: DEMO_DRAFTS, submitted: DEMO_SUBMITTED_ROWS };
  }
}

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildCalendarDays(visibleMonth: Date) {
  const y = visibleMonth.getFullYear();
  const m = visibleMonth.getMonth();
  const first = new Date(y, m, 1);
  const start = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();
  const cells: Array<{ day: number; monthOffset: -1 | 0 | 1; iso: string }> = [];
  for (let i = 0; i < start; i++) {
    const day = prevDays - start + i + 1;
    cells.push({ day, monthOffset: -1, iso: toISODate(new Date(y, m - 1, day)) });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, monthOffset: 0, iso: toISODate(new Date(y, m, day)) });
  }
  while (cells.length < 42) {
    const day = cells.length - (start + daysInMonth) + 1;
    cells.push({ day, monthOffset: 1, iso: toISODate(new Date(y, m + 1, day)) });
  }
  return cells;
}

export function ExpenseOverview() {
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [drafts, setDrafts] = useState<ExpenseDraftData[]>(() => loadExpenseStateFromStorage().drafts);
  const [submittedExpenses, setSubmittedExpenses] = useState<TableRow[]>(() => loadExpenseStateFromStorage().submitted);
  const [recentExpenseRowId, setRecentExpenseRowId] = useState<string | null>(null);
  const [selectedDraft, setSelectedDraft] = useState<ExpenseDraftData | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>({ type: "90d" });
  const [draftDateFilter, setDraftDateFilter] = useState<DateFilter>({ type: "90d" });
  const [customMonth, setCustomMonth] = useState(() => new Date());
  const [activeDateField, setActiveDateField] = useState<"start" | "end">("start");

  useEffect(() => {
    window.localStorage.setItem("expense-drafts", JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    window.localStorage.setItem("submitted-expenses", JSON.stringify(submittedExpenses));
  }, [submittedExpenses]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (filterOpen && filterRef.current && !filterRef.current.contains(target)) {
        setFilterOpen(false);
      }
    }
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [filterOpen]);

  useEffect(() => {
    if (!filterOpen) return;
    setDraftDateFilter(dateFilter);
  }, [filterOpen, dateFilter]);

  function handleSaveDraft(draft: ExpenseDraftData) {
    setDrafts((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === draft.id);
      if (existingIdx === -1) return [draft, ...prev];
      const next = [...prev];
      next[existingIdx] = draft;
      return next.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    });
    setSelectedDraft(null);
    setNewExpenseOpen(false);
    toast("Expense saved to drafts");
  }

  function handleOpenDraft(draft: ExpenseDraftData) {
    setSelectedDraft(draft);
    setNewExpenseOpen(true);
  }

  function formatDateMMDDYY(isoDate: string): string {
    const d = new Date(`${isoDate}T00:00:00`);
    const mm = String(d.getMonth() + 1);
    const dd = String(d.getDate()).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
  }

  function toMoney(amount: string): string {
    const n = Number(amount.replace(/,/g, ""));
    const safe = Number.isFinite(n) ? n : 0;
    return safe.toLocaleString(undefined, { style: "currency", currency: "USD" });
  }

  function handleSubmitExpense(expense: ExpenseDraftData) {
    const submittedIso = new Date().toISOString().slice(0, 10);
    const requester = CURRENT_USER_EMAIL;
    const rowId = `submitted-${expense.id}`;
    const nextRow: TableRow = {
      id: rowId,
      date: formatDateMMDDYY(submittedIso),
      dateIso: submittedIso,
      requester,
      initials: "YO",
      color: "#6573f9",
      type: expense.type === "Reimbursement" ? "Reimbursement" : "Expense",
      amount: toMoney(expense.amount),
      category: (expense.category || "Other") as TableRow["category"],
      lineItems: expense.items.filter((item) => item.name?.trim() || item.amount?.trim()),
      description: expense.description,
      attachmentNames: expense.attachments.map((a) => a.name),
    };
    setSubmittedExpenses((prev) => [nextRow, ...prev.filter((row) => row.id !== rowId)]);
    setRecentExpenseRowId(rowId);
    setDateFilter({ type: "90d" });
  }

  const filterLabel = useMemo(() => {
    if (dateFilter.type === "today") return "Today";
    if (dateFilter.type === "30d") return "Last 30 days";
    if (dateFilter.type === "90d") return "Last 90 days";
    return dateFilter.start && dateFilter.end ? `${dateFilter.start} to ${dateFilter.end}` : "Custom range";
  }, [dateFilter]);
  const calendarDays = useMemo(() => buildCalendarDays(customMonth), [customMonth]);

  const statCards = [
    { icon: <StatCardIcons.moneySendCircle />, label: "Total Spend", value: "$35,000.00" },
    { icon: <StatCardIcons.checkmarkCircle02 />, label: "Approved (Unpaid)", value: "$8,420.00" },
    { icon: <StatCardIcons.loading01 />, label: "Pending approval", value: "17 requests" },
    { icon: <StatCardIcons.clock01 />, label: "Overdue", value: "24 requests" },
  ];

  const requestCards = [
    {
      title: "Expense requests",
      submitted: { count: 27, amount: "$3,600" },
      pending: { count: 11, amount: "$2,450" },
      overdue: { count: 20, amount: "$1,970" },
      total: { count: 58, amount: "$8,020" },
    },
    {
      title: "Reimbursement requests",
      submitted: { count: 14, amount: "$2,850" },
      pending: { count: 6, amount: "$2,850" },
      overdue: { count: 4, amount: "$2,850" },
      total: { count: 24, amount: "$8,420" },
    },
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col mx-2 sm:mx-4 lg:mx-0 lg:mr-3" style={{ background: "white", border: "1px solid #EDEFF4", borderRadius: "24px 24px 0 0", overflow: "hidden" }}>
      <div className="flex-1 min-h-0 overflow-y-auto w-full">
      <div className="px-4 sm:px-6 lg:px-[60px] py-4 sm:py-6 lg:py-7 flex flex-col" style={{ gap: "24px" }}>
        {/* Page heading + actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg sm:text-[22px] font-semibold text-[#272835] tracking-tight">
            Expense Overview
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => setFilterOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 h-10 text-sm font-medium border border-[#EDEFF4] rounded-lg text-[#272835] hover:bg-[#f4f5f8] transition-colors"
              >
                <FilterLinesIcon />
                {filterLabel}
              </button>
              {filterOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 z-20 w-[320px] rounded-xl border border-[#DFE1E6] bg-white p-3 shadow-[0_10px_20px_rgba(13,13,18,0.08)]">
                  <div className="space-y-2">
                    {[
                      { id: "today", label: "Today" },
                      { id: "30d", label: "Last 30 days" },
                      { id: "90d", label: "Last 90 days" },
                      { id: "custom", label: "Custom range" },
                    ].map((option) => (
                      <label key={option.id} className="flex items-center gap-2 text-sm text-[#272835] cursor-pointer">
                        <input
                          type="radio"
                          name="date-range"
                          checked={draftDateFilter.type === option.id}
                          onChange={() => {
                            if (option.id === "custom") {
                              setDraftDateFilter((prev) =>
                                prev.type === "custom" ? prev : { type: "custom", start: "", end: "" }
                              );
                            } else {
                              setDraftDateFilter({ type: option.id as "today" | "30d" | "90d" });
                            }
                          }}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  {draftDateFilter.type === "custom" && (
                    <div className="mt-3 pt-3 border-t border-[#EDEFF4] space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveDateField("start")}
                          className={`h-9 rounded-md border px-2 text-sm text-left ${
                            activeDateField === "start" ? "border-[#6573F9] bg-[#F6F7FF]" : "border-[#DFE1E6]"
                          }`}
                        >
                          {draftDateFilter.start || "Start date"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveDateField("end")}
                          className={`h-9 rounded-md border px-2 text-sm text-left ${
                            activeDateField === "end" ? "border-[#6573F9] bg-[#F6F7FF]" : "border-[#DFE1E6]"
                          }`}
                        >
                          {draftDateFilter.end || "End date"}
                        </button>
                      </div>
                      <div className="rounded-lg border border-[#DFE1E6] p-2">
                        <div className="flex items-center justify-between mb-2">
                          <button
                            type="button"
                            className="w-7 h-7 rounded-md hover:bg-[#F4F5F8]"
                            onClick={() => setCustomMonth(new Date(customMonth.getFullYear(), customMonth.getMonth() - 1, 1))}
                          >
                            {"<"}
                          </button>
                          <p className="text-sm font-medium text-[#272835]">
                            {customMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                          </p>
                          <button
                            type="button"
                            className="w-7 h-7 rounded-md hover:bg-[#F4F5F8]"
                            onClick={() => setCustomMonth(new Date(customMonth.getFullYear(), customMonth.getMonth() + 1, 1))}
                          >
                            {">"}
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-[11px] text-[#808897] mb-1">
                          {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
                            <div key={`${d}-${idx}`} className="h-7 flex items-center justify-center">{d}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {calendarDays.map((cell) => (
                            <button
                              key={cell.iso}
                              type="button"
                              onClick={() => {
                                setDraftDateFilter((prev) => {
                                  if (prev.type !== "custom") return { type: "custom", start: cell.iso, end: "" };
                                  if (activeDateField === "start") return { ...prev, start: cell.iso };
                                  return { ...prev, end: cell.iso };
                                });
                                if (activeDateField === "start") setActiveDateField("end");
                              }}
                              className={`h-8 rounded-md text-xs ${
                                cell.monthOffset !== 0 ? "opacity-40" : ""
                              } ${
                                draftDateFilter.type === "custom" &&
                                (draftDateFilter.start === cell.iso || draftDateFilter.end === cell.iso)
                                  ? "bg-[#5E56FF] text-white"
                                  : "text-[#272835] hover:bg-[#F4F5F8]"
                              }`}
                            >
                              {cell.day}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-3 pt-3 border-t border-[#EDEFF4] flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (draftDateFilter.type === "custom") {
                          const start = draftDateFilter.start;
                          const end = draftDateFilter.end;
                          if (!start || !end) return;
                          const [s, e] = start <= end ? [start, end] : [end, start];
                          setDateFilter({ type: "custom", start: s, end: e });
                        } else {
                          setDateFilter(draftDateFilter);
                        }
                        setFilterOpen(false);
                      }}
                      className="h-9 px-4 rounded-md bg-[#5E56FF] text-white text-sm font-medium hover:opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedDraft(null);
                setNewExpenseOpen(true);
              }}
              className="inline-flex items-center gap-1.5 text-white font-medium transition-opacity hover:opacity-90"
              style={{ height: "40px", padding: "0 18px", fontSize: "14px", cursor: "pointer", borderRadius: "12px", border: "1px solid #6573F9", background: "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(355deg, #625AFF 3.89%, #645CFF 95.37%)", boxShadow: "none" }}
            >
              <Add01Icon />
              Add expense
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-white hover:opacity-90 transition-opacity" style={{ background: "#272835" }}>
              <DotsVerticalIcon />
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
          {statCards.map((card, i) => (
            <div key={card.label} className="reveal-card" style={{ animationDelay: `${i * 120}ms` }}>
              <StatCard icon={card.icon} label={card.label} value={card.value} />
            </div>
          ))}
        </div>

        {/* Request cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "24px" }}>
          {requestCards.map((card, j) => (
            <div key={card.title} className="reveal-card" style={{ animationDelay: `${(statCards.length + j) * 120}ms` }}>
              <RequestCard {...card} />
            </div>
          ))}
        </div>

        {/* Pending requests table */}
        <div className="reveal-card" style={{ animationDelay: `${(statCards.length + requestCards.length) * 120}ms` }}>
          <PendingTable
            draftItems={drafts}
            onOpenDraft={handleOpenDraft}
            rows={submittedExpenses}
            dateFilter={dateFilter}
            newlyAddedRowId={recentExpenseRowId}
          />
        </div>
      </div>
      </div>
      <NewExpenseFlow
        open={newExpenseOpen}
        initialDraft={selectedDraft}
        onClose={() => {
          setSelectedDraft(null);
          setNewExpenseOpen(false);
        }}
        onSaveDraft={handleSaveDraft}
        onSubmitExpense={handleSubmitExpense}
        onSubmitSuccessAcknowledge={() => {
          setNewExpenseOpen(false);
          setSelectedDraft(null);
          toast("Expense submitted successfully", {
            icon: (
              <span aria-hidden="true" className="font-semibold text-[#0EAD5B]">
                ✓
              </span>
            ),
          });
        }}
      />
    </div>
  );
}
